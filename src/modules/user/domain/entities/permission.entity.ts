import { IsEnum, IsString, IsUUID } from 'class-validator'
import { ActionType } from '../../../../@core/enums/action-type.enum'
import { ResourceType } from '../../../../@core/enums/resource-type.enum'
import { ScopeType } from '../../../../@core/enums/scope-type.enum'

export class Permission {
  @IsUUID()
  private readonly _id: string

  @IsUUID()
  private readonly _role_id: string

  @IsEnum(ResourceType)
  private _resource: ResourceType

  @IsEnum(ActionType)
  private _action: ActionType

  @IsEnum(ScopeType)
  private _scope: ScopeType

  @IsString()
  private _specific_scope_id: string

  constructor(
    id: string | null,
    role_id: string,
    resource: ResourceType,
    action: ActionType,
    scope: ScopeType,
    specific_scope_id: string | null = null,
  ) {
    this._id = id
    this._role_id = role_id
    this._resource = resource
    this._action = action
    this._scope = scope
    this._specific_scope_id = specific_scope_id
  }

  // Getters (no changes here)
  get id(): string {
    return this._id
  }

  get resource(): ResourceType {
    return this._resource
  }

  get action(): ActionType {
    return this._action
  }

  get scope(): ScopeType {
    return this._scope
  }

  get role_id(): string {
    return this._role_id
  }

  get specific_scope_id(): string {
    return this._specific_scope_id
  }
}
