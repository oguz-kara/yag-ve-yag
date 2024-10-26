import { Module } from '@nestjs/common'
import { RoleService } from './app/services/role.service'
import { UserService } from './app/services/user.service'
import { RoleMapper } from './infra/mappers/role.mapper'
import { UserMapper } from './infra/mappers/user.mapper'
import { RoleRepository } from './infra/orm/repository/role.repository'
import { UserRepository } from './infra/orm/repository/user.repository'
import { RoleResolver } from './presentation/graphql/role.resolver'

@Module({
  imports: [],
  controllers: [],
  providers: [
    RoleService,
    UserService,
    RoleMapper,
    UserMapper,
    RoleRepository,
    UserRepository,
    RoleResolver,
  ],
})
export class UserModule {}
