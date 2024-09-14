/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	AllowanceOptions = "allowance_options",
	DeductionOptions = "deduction_options",
	Employees = "employees",
	Members = "members",
	ProjectFinance = "project_finance",
	Projects = "projects",
	ProjectsActivities = "projects_activities",
	ProjectsStaff = "projects_staff",
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
	sex?: EmployeesSexOptions
	specialization?: string
	starting_date?: IsoDateString
}

export enum MembersSexOptions {
	"Male" = "Male",
	"Female" = "Female",
}

export enum MembersMembershipStatusOptions {
	"Active" = "Active",
	"Suspended" = "Suspended",
	"Resigned" = "Resigned",
}
export type MembersRecord<Tphone_numbers = unknown> = {
	address?: string
	avatar?: string
	birth_date?: IsoDateString
	membership_status?: MembersMembershipStatusOptions
	name: string
	phone_numbers?: null | Tphone_numbers
	sex?: MembersSexOptions
	starting_date?: IsoDateString
}

export enum ProjectFinanceTypeOptions {
	"donation" = "donation",
	"expense" = "expense",
}
export type ProjectFinanceRecord = {
	amount: number
	fund_facility: string
	project: RecordIdString
	statement?: HTMLString
	type: ProjectFinanceTypeOptions
}

export type ProjectsRecord = {
	details?: HTMLString
	end_date?: IsoDateString
	place?: string
	starting_date?: IsoDateString
	title: string
}

export type ProjectsActivitiesRecord = {
	carry_on_details?: HTMLString
	description?: HTMLString
	end_date?: IsoDateString
	output_details?: HTMLString
	place?: string
	project: RecordIdString
	starting_date?: IsoDateString
	title: string
}

export enum ProjectsStaffTypeOptions {
	"employee" = "employee",
	"member" = "member",
}
export type ProjectsStaffRecord = {
	description?: HTMLString
	person_id: string
	position: string
	project: RecordIdString
	type: ProjectsStaffTypeOptions
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
export type MembersResponse<Tphone_numbers = unknown, Texpand = unknown> = Required<MembersRecord<Tphone_numbers>> & AuthSystemFields<Texpand>
export type ProjectFinanceResponse<Texpand = unknown> = Required<ProjectFinanceRecord> & BaseSystemFields<Texpand>
export type ProjectsResponse<Texpand = unknown> = Required<ProjectsRecord> & BaseSystemFields<Texpand>
export type ProjectsActivitiesResponse<Texpand = unknown> = Required<ProjectsActivitiesRecord> & BaseSystemFields<Texpand>
export type ProjectsStaffResponse<Texpand = unknown> = Required<ProjectsStaffRecord> & BaseSystemFields<Texpand>
export type RolesResponse<Tpermissions = unknown, Texpand = unknown> = Required<RolesRecord<Tpermissions>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	allowance_options: AllowanceOptionsRecord
	deduction_options: DeductionOptionsRecord
	employees: EmployeesRecord
	members: MembersRecord
	project_finance: ProjectFinanceRecord
	projects: ProjectsRecord
	projects_activities: ProjectsActivitiesRecord
	projects_staff: ProjectsStaffRecord
	roles: RolesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	allowance_options: AllowanceOptionsResponse
	deduction_options: DeductionOptionsResponse
	employees: EmployeesResponse
	members: MembersResponse
	project_finance: ProjectFinanceResponse
	projects: ProjectsResponse
	projects_activities: ProjectsActivitiesResponse
	projects_staff: ProjectsStaffResponse
	roles: RolesResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'allowance_options'): RecordService<AllowanceOptionsResponse>
	collection(idOrName: 'deduction_options'): RecordService<DeductionOptionsResponse>
	collection(idOrName: 'employees'): RecordService<EmployeesResponse>
	collection(idOrName: 'members'): RecordService<MembersResponse>
	collection(idOrName: 'project_finance'): RecordService<ProjectFinanceResponse>
	collection(idOrName: 'projects'): RecordService<ProjectsResponse>
	collection(idOrName: 'projects_activities'): RecordService<ProjectsActivitiesResponse>
	collection(idOrName: 'projects_staff'): RecordService<ProjectsStaffResponse>
	collection(idOrName: 'roles'): RecordService<RolesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
