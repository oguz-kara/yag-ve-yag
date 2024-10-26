import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  CreateRoleResponse,
  FindRolesResponseType,
  Role,
} from '../../infra/graphql/role.graphql'
import { RoleService } from '../../app/services/role.service'
import { CreateRoleDto, RenameRoleDto } from '../dto/role.dto'
import { PaginationParamsInput } from 'src/@core/graphql/pagination-params.input'
import { IDInput } from 'src/@core/graphql/id.input'
import { NameInput } from 'src/@core/graphql/name.input'

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => CreateRoleResponse)
  async createRole(@Args('input') createUserInput: CreateRoleDto) {
    const role = await this.roleService.createRole(createUserInput)

    return role
  }

  @Mutation(() => Role)
  async renameRoleById(@Args('input') renameRoleInput: RenameRoleDto) {
    const role = await this.roleService.renameRoleById(
      renameRoleInput.id,
      renameRoleInput.name,
    )

    return role
  }

  @Mutation(() => Role)
  async removeRoleById(@Args('input') removeRoleInput: IDInput) {
    const role = await this.roleService.removeRoleById(removeRoleInput.id)

    return role
  }

  @Query(() => FindRolesResponseType)
  async findRoles(@Args('input') pagination: PaginationParamsInput) {
    const roles = await this.roleService.findMany(pagination)

    return roles
  }

  @Query(() => Role)
  async findRoleById(@Args('input') findRoleInput: IDInput) {
    const { id } = findRoleInput
    const role = await this.roleService.findById(id)

    return role
  }

  @Query(() => Role)
  async findRoleByName(@Args('input') findRoleInput: NameInput) {
    const { name } = findRoleInput
    const role = await this.roleService.findByName(name)

    return role
  }
}
