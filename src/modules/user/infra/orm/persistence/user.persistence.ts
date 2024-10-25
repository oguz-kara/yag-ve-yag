import { UserActiveStatus } from '@prisma/client'

export interface UserPersistence {
  id: string | null
  email: string
  password_hash: string
  email_verified: boolean
  role_id: string
  is_active: UserActiveStatus
  deleted_at?: Date
}
