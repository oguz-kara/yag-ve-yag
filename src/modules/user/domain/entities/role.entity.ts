import { Permission } from './permission.entity'

export class Role {
  private _id: string
  private _name: string
  private _permissions?: Permission[] = []
  private _created_at: Date
  private _updated_at: Date

  constructor(
    id: string,
    name: string,
    permissions: Permission[] = [],
    created_at: Date = new Date(),
    updated_at: Date = new Date(),
  ) {
    this._id = id
    this._name = name
    this._permissions = permissions
    this._created_at = created_at
    this._updated_at = updated_at
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get permissions(): Permission[] {
    return [...this._permissions]
  }

  get created_at(): Date {
    return this._created_at
  }

  get updated_at(): Date {
    return this._updated_at
  }

  public addPermission(permission: Permission): void {
    if (!this.hasPermission(permission)) {
      this._permissions.push(permission)
      this._updated_at = new Date()
    }
  }

  public removePermission(permission: Permission): void {
    this._permissions = this._permissions.filter((p) => p.id !== permission.id)
    this._updated_at = new Date()
  }

  public hasPermission(permission: Permission): boolean {
    return this._permissions.some((p) => p.id === permission.id)
  }

  public renameRole(newName: string): void {
    this._name = newName
    this._updated_at = new Date()
  }

  public assignId(id: string): void {
    this._id = id
  }
}
