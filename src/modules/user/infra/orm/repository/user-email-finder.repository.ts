import { User } from 'src/modules/user/domain/entities/user.entity'

export interface UserEmailFinderRepository {
  findByEmail(email: string): Promise<User | null>
}
