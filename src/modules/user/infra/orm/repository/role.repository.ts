import { Repository } from 'src/@core/repository/repository.interface'
import { DbService } from 'src/@core/database/db.service'
import {
  PaginatedList,
  PaginationParams,
} from 'src/@core/types/pagination.type'
import { Role } from 'src/modules/user/domain/entities/role.entity'
import { RoleMapper } from '../../mappers/role.mapper'
import { PermissionPersistence } from '../persistence/permission.persistence'
import { NameFinderRepository } from 'src/@core/interfaces/name-finder'
import { ConflictException, Injectable } from '@nestjs/common'

@Injectable()
export class RoleRepository
  implements Repository<Role>, NameFinderRepository<Role>
{
  constructor(
    private readonly db: DbService,
    private readonly roleMapper: RoleMapper,
  ) {}

  async findById(id: string): Promise<Role | null> {
    const role = await this.db.role.findUnique({
      where: { id },
      select: { permissions: true, id: true, name: true },
    })

    if (!role) throw new Error('Role not found!')

    return this.roleMapper.toDomain({
      ...role,
      permissions: role.permissions as PermissionPersistence[],
    })
  }

  async findByName(name: string): Promise<Role | null> {
    const role = await this.db.role.findFirst({
      where: { name },
      select: { permissions: true, id: true, name: true },
    })

    if (!role) return null

    return this.roleMapper.toDomain({
      ...role,
      permissions: role.permissions as PermissionPersistence[],
    })
  }

  async findAll(args: PaginationParams): Promise<PaginatedList<Role>> {
    const { limit, position } = args

    const total = await this.db.role.count()

    const users = await this.db.role.findMany({
      take: limit,
      skip: position,
      select: {
        permissions: true,
        id: true,
        name: true,
      },
    })

    return {
      items: users.map((role) =>
        this.roleMapper.toDomain({
          ...role,
          permissions: role.permissions as PermissionPersistence[],
        }),
      ),
      pagination: {
        total,
        limit,
        position,
      },
    }
  }

  async remove(id: string): Promise<Role | null> {
    const role = await this.db.role.findFirst({
      where: { id },
    })

    if (!role) return null

    const removedRole = await this.db.role.delete({
      where: { id },
    })

    return this.roleMapper.toDomain(removedRole)
  }

  async save(role: Role): Promise<void> {
    const persistenceRole = this.roleMapper.toPersistence(role)

    if (role.id) {
      await this.db.role.update({
        where: { id: role.id },
        data: {
          ...persistenceRole,
          permissions: {
            set: persistenceRole.permissions.map((p) => ({ id: p.id })),
          },
        },
      })
    } else {
      const permissionIds = persistenceRole.permissions.map((p) => ({
        id: p.id,
      }))

      const createdRole = await this.db.role.create({
        data: {
          name: persistenceRole.name,
          permissions: {
            connect: permissionIds,
          },
        },
      })

      if (!createdRole.id)
        throw new ConflictException('An error occurred when creating the role!')

      role.assignId(createdRole.id)
    }
  }
}
