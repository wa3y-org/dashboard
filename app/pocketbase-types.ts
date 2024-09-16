/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	ActivitiesFinance = "activities_finance",
	ActivitiesStaff = "activities_staff",
	ActivitiesTimelines = "activities_timelines",
	AllowanceOptions = "allowance_options",
	Assets = "assets",
	DeductionOptions = "deduction_options",
	Employees = "employees",
	Members = "members",
	ProjectFinance = "project_finance",
	Projects = "projects",
	ProjectsActivities = "projects_activities",
	ProjectsStaff = "projects_staff",
	ProjectsTimelines = "projects_timelines",
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

export enum ActivitiesFinanceTypeOptions {
	"donation" = "donation",
	"expense" = "expense",
}
export type ActivitiesFinanceRecord = {
	activity: RecordIdString
	amount: number
	fund_facility: string
	statement?: HTMLString
	type: ActivitiesFinanceTypeOptions
}

export enum ActivitiesStaffTypeOptions {
	"employee" = "employee",
	"member" = "member",
}
export type ActivitiesStaffRecord = {
	activity: RecordIdString
	description?: HTMLString
	person_id: string
	position: string
	type: ActivitiesStaffTypeOptions
}

export type ActivitiesTimelinesRecord = {
	activity?: RecordIdString
	creator?: RecordIdString
	post?: HTMLString
	reply_to?: RecordIdString
	title: string
}

export type AllowanceOptionsRecord = {
	amount: number
	description?: HTMLString
	title: string
}

export type AssetsRecord = {
	broken_total?: number
	details?: HTMLString
	functional_total?: number
	title: string
	unit?: string
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
	roles?: RecordIdString[]
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

export type ProjectsTimelinesRecord = {
	creator?: RecordIdString
	post?: HTMLString
	project?: RecordIdString
	reply_to?: RecordIdString
	title: string
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
export type ActivitiesFinanceResponse<Texpand = unknown> = Required<ActivitiesFinanceRecord> & BaseSystemFields<Texpand>
export type ActivitiesStaffResponse<Texpand = unknown> = Required<ActivitiesStaffRecord> & BaseSystemFields<Texpand>
export type ActivitiesTimelinesResponse<Texpand = unknown> = Required<ActivitiesTimelinesRecord> & BaseSystemFields<Texpand>
export type AllowanceOptionsResponse<Texpand = unknown> = Required<AllowanceOptionsRecord> & BaseSystemFields<Texpand>
export type AssetsResponse<Texpand = unknown> = Required<AssetsRecord> & BaseSystemFields<Texpand>
export type DeductionOptionsResponse<Texpand = unknown> = Required<DeductionOptionsRecord> & BaseSystemFields<Texpand>
export type EmployeesResponse<Tphone_numbers = unknown, Texpand = unknown> = Required<EmployeesRecord<Tphone_numbers>> & AuthSystemFields<Texpand>
export type MembersResponse<Tphone_numbers = unknown, Texpand = unknown> = Required<MembersRecord<Tphone_numbers>> & AuthSystemFields<Texpand>
export type ProjectFinanceResponse<Texpand = unknown> = Required<ProjectFinanceRecord> & BaseSystemFields<Texpand>
export type ProjectsResponse<Texpand = unknown> = Required<ProjectsRecord> & BaseSystemFields<Texpand>
export type ProjectsActivitiesResponse<Texpand = unknown> = Required<ProjectsActivitiesRecord> & BaseSystemFields<Texpand>
export type ProjectsStaffResponse<Texpand = unknown> = Required<ProjectsStaffRecord> & BaseSystemFields<Texpand>
export type ProjectsTimelinesResponse<Texpand = unknown> = Required<ProjectsTimelinesRecord> & BaseSystemFields<Texpand>
export type RolesResponse<Tpermissions = unknown, Texpand = unknown> = Required<RolesRecord<Tpermissions>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	activities_finance: ActivitiesFinanceRecord
	activities_staff: ActivitiesStaffRecord
	activities_timelines: ActivitiesTimelinesRecord
	allowance_options: AllowanceOptionsRecord
	assets: AssetsRecord
	deduction_options: DeductionOptionsRecord
	employees: EmployeesRecord
	members: MembersRecord
	project_finance: ProjectFinanceRecord
	projects: ProjectsRecord
	projects_activities: ProjectsActivitiesRecord
	projects_staff: ProjectsStaffRecord
	projects_timelines: ProjectsTimelinesRecord
	roles: RolesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	activities_finance: ActivitiesFinanceResponse
	activities_staff: ActivitiesStaffResponse
	activities_timelines: ActivitiesTimelinesResponse
	allowance_options: AllowanceOptionsResponse
	assets: AssetsResponse
	deduction_options: DeductionOptionsResponse
	employees: EmployeesResponse
	members: MembersResponse
	project_finance: ProjectFinanceResponse
	projects: ProjectsResponse
	projects_activities: ProjectsActivitiesResponse
	projects_staff: ProjectsStaffResponse
	projects_timelines: ProjectsTimelinesResponse
	roles: RolesResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'activities_finance'): RecordService<ActivitiesFinanceResponse>
	collection(idOrName: 'activities_staff'): RecordService<ActivitiesStaffResponse>
	collection(idOrName: 'activities_timelines'): RecordService<ActivitiesTimelinesResponse>
	collection(idOrName: 'allowance_options'): RecordService<AllowanceOptionsResponse>
	collection(idOrName: 'assets'): RecordService<AssetsResponse>
	collection(idOrName: 'deduction_options'): RecordService<DeductionOptionsResponse>
	collection(idOrName: 'employees'): RecordService<EmployeesResponse>
	collection(idOrName: 'members'): RecordService<MembersResponse>
	collection(idOrName: 'project_finance'): RecordService<ProjectFinanceResponse>
	collection(idOrName: 'projects'): RecordService<ProjectsResponse>
	collection(idOrName: 'projects_activities'): RecordService<ProjectsActivitiesResponse>
	collection(idOrName: 'projects_staff'): RecordService<ProjectsStaffResponse>
	collection(idOrName: 'projects_timelines'): RecordService<ProjectsTimelinesResponse>
	collection(idOrName: 'roles'): RecordService<RolesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
