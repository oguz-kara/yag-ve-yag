import { InputType, Field } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class IDInput {
  @Field()
  @IsString()
  id: string
}