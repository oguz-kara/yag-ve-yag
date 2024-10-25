import { User } from '../../domain/entities/user.entity'
import { UserRepository } from '../../infra/orm/repository/user.repository'
import { PaginationParams } from 'src/@core/types/pagination.type'
import { PaginatedItemsResponse } from 'src/@core/types/items-response.type'
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserDto } from '../../presentation/dto/user.dto'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id)

    if (!user) throw new NotFoundException('User not found!')

    return user
  }

  async findMany(
    params: PaginationParams,
  ): Promise<PaginatedItemsResponse<User>> {
    const { limit, position } = params

    const user = await this.userRepository.findAll({ limit, position })

    return user
  }

  async changeUserEmailById(id: string, email: string) {
    const user = await this.userRepository.findById(id)

    if (!user) throw new NotFoundException('User not found!')

    user.changeEmail(email)

    await this.userRepository.save(user)

    return user
  }

  async createUser(user: CreateUserDto) {
    const existedUser = await this.userRepository.findByEmail(user.email)

    if (existedUser) throw new ConflictException('User already exists!')

    const createdUser = new User(
      null,
      user.email,
      user.password,
      user.email_verified,
      user.role_id,
      user.is_active,
    )

    await this.userRepository.save(createdUser)

    return user
  }
}
