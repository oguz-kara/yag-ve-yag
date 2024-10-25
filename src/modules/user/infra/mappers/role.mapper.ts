import { Mapper } from '../../../../@core/interfaces/mapper.interface'
import { Injectable } from '@nestjs/common'
import { Role } from '../../domain/entities/role.entity'
import { RolePersistence } from '../orm/persistence/role.persistence'

@Injectable()
export class RoleMapper implements Mapper<Role, RolePersistence> {
  toDomain(entity: RolePersistence): Role {
    return new Role(entity.id, entity.name)
  }

  toPersistence(entity: Role): RolePersistence {
    return {
      id: entity.id,
      name: entity.name,
      permissions: entity.permissions.map((p) => ({
        id: p.id,
        role_id: p.role_id,
        resource: p.resource,
        action: p.action,
        scope: p.scope,
      })),
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    }
  }
}
