/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	ActivitiesFinance = "activities_finance",
	ActivitiesStaff = "activities_staff",
	ActivitiesTimelines = "activities_timelines",
	AllowanceOptions = "allowance_options",
	Assets = "assets",
	DeductionOptions = "deduction_options",
	Employees = "employees",
	EmployeesAdvances = "employees_advances",
	EmployeesAdvancesPayments = "employees_advances_payments",
	EmployeesTasks = "employees_tasks",
	Finance = "finance",
	Members = "members",
	Payroll = "payroll",
	ProjectFinance = "project_finance",
	Projects = "projects",
	ProjectsActivities = "projects_activities",
	ProjectsStaff = "projects_staff",
	ProjectsTimelines = "projects_timelines",
	Roles = "roles",
	Users = "users",
	Volunteers = "volunteers",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
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

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export enum ActivitiesFinanceTypeOptions {
	"donation" = "donation",
	"expense" = "expense",
}
export type ActivitiesFinanceRecord = {
	activity: RecordIdString
	amount: number
	created?: IsoDateString
	fund_facility: string
	id: string
	statement?: HTMLString
	type: ActivitiesFinanceTypeOptions
	updated?: IsoDateString
}

export enum ActivitiesStaffTypeOptions {
	"employee" = "employee",
	"member" = "member",
}
export type ActivitiesStaffRecord = {
	activity: RecordIdString
	created?: IsoDateString
	description?: HTMLString
	id: string
	person_id: string
	position: string
	type: ActivitiesStaffTypeOptions
	updated?: IsoDateString
}

export type ActivitiesTimelinesRecord = {
	activity?: RecordIdString
	created?: IsoDateString
	creator?: RecordIdString
	id: string
	post?: HTMLString
	reply_to?: RecordIdString
	title: string
	updated?: IsoDateString
}

export type AllowanceOptionsRecord = {
	amount: number
	created?: IsoDateString
	description?: HTMLString
	id: string
	title: string
	updated?: IsoDateString
}

export type AssetsRecord = {
	broken_total?: number
	created?: IsoDateString
	details?: HTMLString
	functional_total?: number
	id: string
	title: string
	unit?: string
	updated?: IsoDateString
}

export type DeductionOptionsRecord = {
	amount: number
	created?: IsoDateString
	description?: HTMLString
	id: string
	title: string
	updated?: IsoDateString
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
	created?: IsoDateString
	deductions?: RecordIdString[]
	email: string
	emailVisibility?: boolean
	employment_position?: string
	employment_section?: string
	employment_status?: EmployeesEmploymentStatusOptions
	employment_type?: string
	id: string
	job_description?: HTMLString
	marital_status?: string
	name: string
	number_of_children?: number
	password: string
	phone_numbers?: null | Tphone_numbers
	project?: RecordIdString
	qualification?: string
	roles?: RecordIdString[]
	sex?: EmployeesSexOptions
	shift?: string
	specialization?: string
	starting_date?: IsoDateString
	tokenKey: string
	updated?: IsoDateString
	username: string
	verified?: boolean
}

export type EmployeesAdvancesRecord = {
	amount: number
	created?: IsoDateString
	employee: RecordIdString
	id: string
	payed?: number
	statement?: HTMLString
	updated?: IsoDateString
}

export type EmployeesAdvancesPaymentsRecord = {
	advance: RecordIdString
	amount: number
	created?: IsoDateString
	id: string
	statement?: HTMLString
	updated?: IsoDateString
}

export type EmployeesTasksRecord = {
	complition_date?: IsoDateString
	created?: IsoDateString
	details?: HTMLString
	due_date: IsoDateString
	employee: RecordIdString
	id: string
	title: string
	updated?: IsoDateString
}

export enum FinanceTypeOptions {
	"donation" = "donation",
	"expense" = "expense",
}
export type FinanceRecord = {
	amount: number
	created?: IsoDateString
	fund_facility: string
	id: string
	statement?: HTMLString
	type: FinanceTypeOptions
	updated?: IsoDateString
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
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	membership_status?: MembersMembershipStatusOptions
	name: string
	password: string
	phone_numbers?: null | Tphone_numbers
	sex?: MembersSexOptions
	starting_date?: IsoDateString
	tokenKey: string
	updated?: IsoDateString
	username: string
	verified?: boolean
}

export type PayrollRecord<Tsalary_details = unknown> = {
	created?: IsoDateString
	employee: RecordIdString
	id: string
	month: number
	payed: number
	salary_details: null | Tsalary_details
	total_salary: number
	updated?: IsoDateString
	year: number
}

export enum ProjectFinanceTypeOptions {
	"donation" = "donation",
	"expense" = "expense",
}
export type ProjectFinanceRecord = {
	amount: number
	created?: IsoDateString
	fund_facility: string
	id: string
	project: RecordIdString
	statement?: HTMLString
	type: ProjectFinanceTypeOptions
	updated?: IsoDateString
}

export type ProjectsRecord = {
	created?: IsoDateString
	details?: HTMLString
	end_date?: IsoDateString
	id: string
	place?: string
	starting_date?: IsoDateString
	title: string
	updated?: IsoDateString
}

export type ProjectsActivitiesRecord = {
	carry_on_details?: HTMLString
	created?: IsoDateString
	description?: HTMLString
	end_date?: IsoDateString
	id: string
	output_details?: HTMLString
	place?: string
	project: RecordIdString
	starting_date?: IsoDateString
	title: string
	updated?: IsoDateString
}

export enum ProjectsStaffTypeOptions {
	"employee" = "employee",
	"member" = "member",
}
export type ProjectsStaffRecord = {
	created?: IsoDateString
	description?: HTMLString
	id: string
	person_id: string
	position: string
	project: RecordIdString
	type: ProjectsStaffTypeOptions
	updated?: IsoDateString
}

export type ProjectsTimelinesRecord = {
	created?: IsoDateString
	creator?: RecordIdString
	id: string
	post?: HTMLString
	project?: RecordIdString
	reply_to?: RecordIdString
	title: string
	updated?: IsoDateString
}

export type RolesRecord<Tpermissions = unknown> = {
	created?: IsoDateString
	description?: HTMLString
	id: string
	permissions: null | Tpermissions
	title: string
	updated?: IsoDateString
}

export enum UsersStatusOptions {
	"ACTIVE" = "ACTIVE",
	"SUSPENDED" = "SUSPENDED",
}
export type UsersRecord = {
	avatar?: string
	bio?: HTMLString
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	name: string
	password: string
	roles?: RecordIdString[]
	status: UsersStatusOptions
	tokenKey: string
	updated?: IsoDateString
	username: string
	verified?: boolean
}

export enum VolunteersSexOptions {
	"Male" = "Male",
	"Female" = "Female",
}

export enum VolunteersMembershipStatusOptions {
	"Active" = "Active",
	"Suspended" = "Suspended",
	"Resigned" = "Resigned",
}
export type VolunteersRecord<Tphone_numbers = unknown> = {
	address?: string
	avatar?: string
	birth_date?: IsoDateString
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	membership_status?: VolunteersMembershipStatusOptions
	name: string
	password: string
	phone_numbers?: null | Tphone_numbers
	sex?: VolunteersSexOptions
	starting_date?: IsoDateString
	tokenKey: string
	updated?: IsoDateString
	username: string
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type ActivitiesFinanceResponse<Texpand = unknown> = Required<ActivitiesFinanceRecord> & BaseSystemFields<Texpand>
export type ActivitiesStaffResponse<Texpand = unknown> = Required<ActivitiesStaffRecord> & BaseSystemFields<Texpand>
export type ActivitiesTimelinesResponse<Texpand = unknown> = Required<ActivitiesTimelinesRecord> & BaseSystemFields<Texpand>
export type AllowanceOptionsResponse<Texpand = unknown> = Required<AllowanceOptionsRecord> & BaseSystemFields<Texpand>
export type AssetsResponse<Texpand = unknown> = Required<AssetsRecord> & BaseSystemFields<Texpand>
export type DeductionOptionsResponse<Texpand = unknown> = Required<DeductionOptionsRecord> & BaseSystemFields<Texpand>
export type EmployeesResponse<Tphone_numbers = unknown, Texpand = unknown> = Required<EmployeesRecord<Tphone_numbers>> & AuthSystemFields<Texpand>
export type EmployeesAdvancesResponse<Texpand = unknown> = Required<EmployeesAdvancesRecord> & BaseSystemFields<Texpand>
export type EmployeesAdvancesPaymentsResponse<Texpand = unknown> = Required<EmployeesAdvancesPaymentsRecord> & BaseSystemFields<Texpand>
export type EmployeesTasksResponse<Texpand = unknown> = Required<EmployeesTasksRecord> & BaseSystemFields<Texpand>
export type FinanceResponse<Texpand = unknown> = Required<FinanceRecord> & BaseSystemFields<Texpand>
export type MembersResponse<Tphone_numbers = unknown, Texpand = unknown> = Required<MembersRecord<Tphone_numbers>> & AuthSystemFields<Texpand>
export type PayrollResponse<Tsalary_details = unknown, Texpand = unknown> = Required<PayrollRecord<Tsalary_details>> & BaseSystemFields<Texpand>
export type ProjectFinanceResponse<Texpand = unknown> = Required<ProjectFinanceRecord> & BaseSystemFields<Texpand>
export type ProjectsResponse<Texpand = unknown> = Required<ProjectsRecord> & BaseSystemFields<Texpand>
export type ProjectsActivitiesResponse<Texpand = unknown> = Required<ProjectsActivitiesRecord> & BaseSystemFields<Texpand>
export type ProjectsStaffResponse<Texpand = unknown> = Required<ProjectsStaffRecord> & BaseSystemFields<Texpand>
export type ProjectsTimelinesResponse<Texpand = unknown> = Required<ProjectsTimelinesRecord> & BaseSystemFields<Texpand>
export type RolesResponse<Tpermissions = unknown, Texpand = unknown> = Required<RolesRecord<Tpermissions>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type VolunteersResponse<Tphone_numbers = unknown, Texpand = unknown> = Required<VolunteersRecord<Tphone_numbers>> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	activities_finance: ActivitiesFinanceRecord
	activities_staff: ActivitiesStaffRecord
	activities_timelines: ActivitiesTimelinesRecord
	allowance_options: AllowanceOptionsRecord
	assets: AssetsRecord
	deduction_options: DeductionOptionsRecord
	employees: EmployeesRecord
	employees_advances: EmployeesAdvancesRecord
	employees_advances_payments: EmployeesAdvancesPaymentsRecord
	employees_tasks: EmployeesTasksRecord
	finance: FinanceRecord
	members: MembersRecord
	payroll: PayrollRecord
	project_finance: ProjectFinanceRecord
	projects: ProjectsRecord
	projects_activities: ProjectsActivitiesRecord
	projects_staff: ProjectsStaffRecord
	projects_timelines: ProjectsTimelinesRecord
	roles: RolesRecord
	users: UsersRecord
	volunteers: VolunteersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	activities_finance: ActivitiesFinanceResponse
	activities_staff: ActivitiesStaffResponse
	activities_timelines: ActivitiesTimelinesResponse
	allowance_options: AllowanceOptionsResponse
	assets: AssetsResponse
	deduction_options: DeductionOptionsResponse
	employees: EmployeesResponse
	employees_advances: EmployeesAdvancesResponse
	employees_advances_payments: EmployeesAdvancesPaymentsResponse
	employees_tasks: EmployeesTasksResponse
	finance: FinanceResponse
	members: MembersResponse
	payroll: PayrollResponse
	project_finance: ProjectFinanceResponse
	projects: ProjectsResponse
	projects_activities: ProjectsActivitiesResponse
	projects_staff: ProjectsStaffResponse
	projects_timelines: ProjectsTimelinesResponse
	roles: RolesResponse
	users: UsersResponse
	volunteers: VolunteersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'activities_finance'): RecordService<ActivitiesFinanceResponse>
	collection(idOrName: 'activities_staff'): RecordService<ActivitiesStaffResponse>
	collection(idOrName: 'activities_timelines'): RecordService<ActivitiesTimelinesResponse>
	collection(idOrName: 'allowance_options'): RecordService<AllowanceOptionsResponse>
	collection(idOrName: 'assets'): RecordService<AssetsResponse>
	collection(idOrName: 'deduction_options'): RecordService<DeductionOptionsResponse>
	collection(idOrName: 'employees'): RecordService<EmployeesResponse>
	collection(idOrName: 'employees_advances'): RecordService<EmployeesAdvancesResponse>
	collection(idOrName: 'employees_advances_payments'): RecordService<EmployeesAdvancesPaymentsResponse>
	collection(idOrName: 'employees_tasks'): RecordService<EmployeesTasksResponse>
	collection(idOrName: 'finance'): RecordService<FinanceResponse>
	collection(idOrName: 'members'): RecordService<MembersResponse>
	collection(idOrName: 'payroll'): RecordService<PayrollResponse>
	collection(idOrName: 'project_finance'): RecordService<ProjectFinanceResponse>
	collection(idOrName: 'projects'): RecordService<ProjectsResponse>
	collection(idOrName: 'projects_activities'): RecordService<ProjectsActivitiesResponse>
	collection(idOrName: 'projects_staff'): RecordService<ProjectsStaffResponse>
	collection(idOrName: 'projects_timelines'): RecordService<ProjectsTimelinesResponse>
	collection(idOrName: 'roles'): RecordService<RolesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'volunteers'): RecordService<VolunteersResponse>
}
