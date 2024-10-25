import { ActionType } from '../../../../../@core/enums/action-type.enum'
import { ResourceType } from '../../../../../@core/enums/resource-type.enum'
import { ScopeType } from '../../../../../@core/enums/scope-type.enum'

export interface PermissionPersistence {
  id: string | null
  role_id: string
  specific_scope_id?: string

  resource: ResourceType
  action: ActionType
  scope: ScopeType

  created_by?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}
