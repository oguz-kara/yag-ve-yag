import { Field, InputType } from '@nestjs/graphql'
import { IsNumber } from 'class-validator'

@InputType()
export class PaginationParamsInput {
  @Field()
  @IsNumber()
  limit: number

  @Field()
  @IsNumber()
  position: number
}
