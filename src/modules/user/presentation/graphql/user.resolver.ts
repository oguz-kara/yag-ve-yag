import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  CreateRoleResponse,
  FindRolesResponseType,
  Role,
} from '../../infra/graphql/role.graphql'
import { RoleService } from '../../app/services/role.service'
import { CreateRoleDto } from '../dto/role.dto'
import { PaginationParamsInput } from 'src/@core/graphql/pagination-params.input'

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => CreateRoleResponse)
  async createRole(@Args('input') createUserInput: CreateRoleDto) {
    const role = await this.roleService.createRole(createUserInput)

    return role
  }

  @Query(() => FindRolesResponseType)
  async findRoles(@Args('input') pagination: PaginationParamsInput) {
    const roles = await this.roleService.findMany(pagination)

    return roles
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello, world!'
  }
}
