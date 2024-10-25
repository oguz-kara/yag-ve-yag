import { UserActiveStatus } from '../enums/user-active-status.enum'

export class User {
  private readonly _id: string | null
  private _email: string
  private _password_hash: string
  private _email_verified: boolean
  private _is_active: UserActiveStatus
  private _role_id: string
  private _created_at: Date
  private _updated_at: Date
  private _deleted_at?: Date

  constructor(
    id: string,
    email: string,
    password_hash: string,
    email_verified: boolean = false,
    role_id: string,
    is_active: UserActiveStatus = UserActiveStatus.INACTIVE,
    created_at: Date = new Date(),
    updated_at: Date = new Date(),
    deleted_at?: Date,
  ) {
    this._id = id
    this._email = email
    this._password_hash = password_hash
    this._email_verified = email_verified
    this._is_active = is_active
    this._role_id = role_id
    this._created_at = created_at
    this._updated_at = updated_at
    this._deleted_at = deleted_at
  }

  get id(): string {
    return this._id
  }

  get email(): string {
    return this._email
  }

  get password_hash(): string {
    return this._password_hash
  }

  get role_id(): string {
    return this._role_id
  }

  get is_active(): string {
    return this._is_active
  }

  get email_verified(): boolean {
    return this._email_verified
  }

  get created_at(): Date {
    return new Date(this._created_at)
  }

  get updated_at(): Date {
    return new Date(this._updated_at)
  }

  get deleted_at(): Date {
    return new Date(this._deleted_at)
  }

  public changeEmail(newEmail: string): void {
    if (this._email_verified) {
      throw new Error('Cannot change email after verification.')
    }
    if (!this.validateEmail(newEmail)) {
      throw new Error('Invalid email format.')
    }
    this._email = newEmail
    this._updated_at = new Date()
  }

  public deleteUser() {
    this._deleted_at = new Date()
  }

  public changePassword(newPasswordHash: string) {
    this._password_hash = newPasswordHash
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
