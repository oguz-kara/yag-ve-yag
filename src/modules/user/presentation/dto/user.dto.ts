import { InputType, Field } from '@nestjs/graphql'
import { IsBoolean, IsEmail, IsString } from 'class-validator'
import { UserActiveStatus } from '../../domain/enums/user-active-status.enum'

@InputType()
export class ChangeEmailInput {
  @Field()
  @IsString()
  userId: string

  @Field()
  @IsString()
  @IsEmail()
  email: string
}

export class CreateUserDto {
  @Field()
  @IsString()
  email: string

  @Field()
  @IsString()
  password: string

  @Field()
  @IsString()
  role_id: string

  @Field()
  @IsBoolean()
  email_verified: boolean

  @Field()
  @IsString()
  is_active: UserActiveStatus
}

export class CreateUserResponse {
  @Field()
  @IsString()
  email: string

  @Field()
  @IsString()
  role_id: string

  @Field()
  @IsBoolean()
  email_verified: boolean

  @Field()
  @IsString()
  is_active: UserActiveStatus
}
