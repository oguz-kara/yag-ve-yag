import { Role } from '../../domain/entities/role.entity'
import { PaginationParams } from 'src/@core/types/pagination.type'
import { PaginatedItemsResponse } from 'src/@core/types/items-response.type'
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateRoleDto } from '../../presentation/dto/role.dto'
import { RoleRepository } from '../../infra/orm/repository/role.repository'

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async createRole(input: CreateRoleDto) {
    const existedRole = await this.roleRepository.findByName(input.name)

    if (existedRole) throw new ConflictException('Role already exists!')

    const role = new Role(null, input.name)

    await this.roleRepository.save(role)

    return role
  }

  async findById(id: string): Promise<Role | null> {
    const role = await this.roleRepository.findById(id)

    if (!role) throw new NotFoundException('Role not found!')

    return role
  }

  async findByName(name: string): Promise<Role | null> {
    const role = await this.roleRepository.findByName(name)

    if (!role) throw new NotFoundException('Role not found!')

    return role
  }

  async findMany(
    params: PaginationParams,
  ): Promise<PaginatedItemsResponse<Role>> {
    const { limit, position } = params

    const role = await this.roleRepository.findAll({ limit, position })

    return role
  }

  async renameRoleById(id: string, name: string) {
    const role = await this.roleRepository.findById(id)

    if (!role) throw new NotFoundException('Role not found!')

    const roleName = await this.roleRepository.findByName(name)

    if (roleName)
      throw new ConflictException('Role already exists! Try another name.')

    role.renameRole(name)

    await this.roleRepository.save(role)

    return role
  }

  async removeRoleById(id: string) {
    const role = await this.roleRepository.findById(id)

    if (!role) throw new ConflictException('Role not found!')

    const removedRole = await this.roleRepository.remove(id)

    return removedRole
  }
}
