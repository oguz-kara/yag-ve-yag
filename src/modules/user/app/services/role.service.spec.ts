import { Test, TestingModule } from '@nestjs/testing'
import { RoleService } from './role.service'
import { RoleRepository } from '../../infra/orm/repository/role.repository'
import { DbService } from 'src/@core/database/db.service'
import { ConflictException } from '@nestjs/common'
import { CreateRoleDto, RenameRoleDto } from '../../presentation/dto/role.dto'
import { RoleMapper } from '../../infra/mappers/role.mapper'

describe('RoleService (Integration)', () => {
  let roleService: RoleService
  let dbService: DbService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleService, RoleRepository, DbService, RoleMapper],
    }).compile()

    roleService = module.get<RoleService>(RoleService)
    dbService = module.get<DbService>(DbService)

    // Clear database
    await dbService.role.deleteMany()
  })

  afterAll(async () => {
    await dbService.$disconnect()
  })

  describe('createRole', () => {
    it('should create a new role successfully', async () => {
      const input: CreateRoleDto = { name: 'Admin' }
      const result = await roleService.createRole(input)

      expect(result.name).toBe('Admin')

      const savedRole = await dbService.role.findUnique({
        where: { id: result.id },
      })
      expect(savedRole).toBeTruthy()
      expect(savedRole?.name).toBe('Admin')
    })

    it('should throw ConflictException if role name already exists', async () => {
      const input: CreateRoleDto = { name: 'Another' }
      await roleService.createRole(input)

      await expect(roleService.createRole(input)).rejects.toThrow(
        ConflictException,
      )
    })
  })

  describe('renameRole', () => {
    it('should rename a role successfully', async () => {
      const createRoleInput: CreateRoleDto = { name: 'Old_Admin_Name' }
      const role = await roleService.createRole(createRoleInput)

      const renameRoleInput: RenameRoleDto = {
        id: role.id,
        name: 'Renamed_Admin',
      }

      const renamedRole = await roleService.renameRoleById(
        renameRoleInput.id,
        renameRoleInput.name,
      )

      expect(renamedRole.name).toBe('Renamed_Admin')

      const savedRole = await dbService.role.findUnique({
        where: { id: role.id },
      })

      expect(savedRole).toBeTruthy()
      expect(savedRole?.name).toBe('Renamed_Admin')
    })

    it('should throw ConflictException if role by provided name already exists', async () => {
      const input: CreateRoleDto = { name: 'ALREADY_EXISTS_ROLE' }
      await roleService.createRole(input)

      await expect(roleService.createRole(input)).rejects.toThrow(
        ConflictException,
      )
    })
  })
})
