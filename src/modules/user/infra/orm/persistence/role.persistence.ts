import { PermissionPersistence } from './permission.persistence'

export interface RolePersistence {
  id: string | null
  name: string
  permissions: PermissionPersistence[]
  created_by?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}
