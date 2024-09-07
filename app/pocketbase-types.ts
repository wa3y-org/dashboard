/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	AllowanceOptions = "allowance_options",
	DeductionOptions = "deduction_options",
	Employees = "employees",
	Roles = "roles",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AllowanceOptionsRecord = {
	amount: number
	description?: HTMLString
	title: string
}

export type DeductionOptionsRecord = {
	amount: number
	description?: HTMLString
	title: string
}

export enum EmployeesSexOptions {
	"Male" = "Male",
	"Female" = "Female",
}

export enum EmployeesEmploymentStatusOptions {
	"Active" = "Active",
	"Suspended" = "Suspended",
	"Resigned" = "Resigned",
	"In_Vacation" = "In_Vacation",
}
export type EmployeesRecord<Tphone_numbers = unknown> = {
	Sex?: EmployeesSexOptions
	address?: string
	allowances?: RecordIdString[]
	avatar?: string
	basic_salary: number
	birth_date?: IsoDateString
	deductions?: RecordIdString[]
	employment_position?: string
	employment_section?: string
	employment_status?: EmployeesEmploymentStatusOptions
	marital_status?: string
	name: string
	number_of_children?: number
	phone_numbers?: null | Tphone_numbers
	qualification?: string
	specialization?: string
	starting_date?: IsoDateString
}

export type RolesRecord<Tpermissions = unknown> = {
	description?: HTMLString
	permissions: null | Tpermissions
	title: string
}

export enum UsersStatusOptions {
	"ACTIVE" = "ACTIVE",
	"SUSPENDED" = "SUSPENDED",
}
export type UsersRecord = {
	avatar?: string
	bio?: HTMLString
	name: string
	roles?: RecordIdString[]
	status: UsersStatusOptions
}

// Response types include system fields and match responses from the PocketBase API
export type AllowanceOptionsResponse<Texpand = unknown> = Required<AllowanceOptionsRecord> & BaseSystemFields<Texpand>
export type DeductionOptionsResponse<Texpand = unknown> = Required<DeductionOptionsRecord> & BaseSystemFields<Texpand>
export type EmployeesResponse<Tphone_numbers = unknown, Texpand = unknown> = Required<EmployeesRecord<Tphone_numbers>> & AuthSystemFields<Texpand>
export type RolesResponse<Tpermissions = unknown, Texpand = unknown> = Required<RolesRecord<Tpermissions>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	allowance_options: AllowanceOptionsRecord
	deduction_options: DeductionOptionsRecord
	employees: EmployeesRecord
	roles: RolesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	allowance_options: AllowanceOptionsResponse
	deduction_options: DeductionOptionsResponse
	employees: EmployeesResponse
	roles: RolesResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'allowance_options'): RecordService<AllowanceOptionsResponse>
	collection(idOrName: 'deduction_options'): RecordService<DeductionOptionsResponse>
	collection(idOrName: 'employees'): RecordService<EmployeesResponse>
	collection(idOrName: 'roles'): RecordService<RolesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
