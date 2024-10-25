import { PaginatedList, PaginationParams } from '../types/pagination.type'

export interface Repository<T> {
  findById(id: string): Promise<T | null>
  findAll(args: PaginationParams): Promise<PaginatedList<T>>
  save(record: T): Promise<void>
}
