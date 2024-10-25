import { UserActiveStatus as UserActiveStatusPersistence } from '@prisma/client'
import {
  UserActiveStatus,
  UserActiveStatus as UserActiveStatusDomain,
} from '../../domain/enums/user-active-status.enum'
import { Mapper } from '../../../../@core/interfaces/mapper.interface'
import { UserPersistence } from '../orm/persistence/user.persistence'
import { Injectable } from '@nestjs/common'
import { User } from '../../domain/entities/user.entity'

@Injectable()
export class UserMapper implements Mapper<User, UserPersistence> {
  toDomain(entity: UserPersistence): User {
    return new User(
      entity.id,
      entity.email,
      entity.password_hash,
      entity.email_verified,
      entity.role_id,
      this.mapActiveStatusToDomain(entity.is_active),
      entity.deleted_at,
    )
  }

  toPersistence(entity: User): UserPersistence {
    return {
      id: entity.id,
      email: entity.email,
      password_hash: entity.password_hash,
      role_id: entity.role_id,
      email_verified: entity.email_verified,
      is_active: this.mapActiveStatusToPersistence(
        entity.is_active as UserActiveStatus,
      ),
      deleted_at: entity.deleted_at,
    }
  }

  private mapActiveStatusToDomain(
    status: UserActiveStatusPersistence,
  ): UserActiveStatusDomain {
    switch (status) {
      case UserActiveStatusPersistence.ACTIVE:
        return UserActiveStatusDomain.ACTIVE
      case UserActiveStatusPersistence.INACTIVE:
        return UserActiveStatusDomain.INACTIVE
      default:
        throw new Error(`Unknown status: ${status}`)
    }
  }

  private mapActiveStatusToPersistence(
    status: UserActiveStatusDomain,
  ): UserActiveStatusPersistence {
    switch (status) {
      case UserActiveStatusDomain.ACTIVE:
        return UserActiveStatusPersistence.ACTIVE
      case UserActiveStatusDomain.INACTIVE:
        return UserActiveStatusPersistence.INACTIVE
      default:
        throw new Error(`Unknown status: ${status}`)
    }
  }
}
