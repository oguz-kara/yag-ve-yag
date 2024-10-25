import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class CreateRoleDto {
  @Field()
  @IsString()
  name: string
}
