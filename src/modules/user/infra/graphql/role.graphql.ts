import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PaginatedResponseMeta {
  @Field(() => Int)
  limit: number

  @Field(() => Int)
  total: number

  @Field(() => Int)
  position: number
}

@ObjectType()
export class Role {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string
}

@ObjectType()
export class CreateRoleResponse {
  @Field(() => String)
  name: string
}

// Define the paginated response for roles
@ObjectType()
export class FindRolesResponseType {
  @Field(() => [Role])
  items: Role[]

  @Field(() => PaginatedResponseMeta)
  pagination: PaginatedResponseMeta
}
