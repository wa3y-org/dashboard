/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
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
	name: string
	roles?: RecordIdString[]
	status: UsersStatusOptions
}

// Response types include system fields and match responses from the PocketBase API
export type RolesResponse<Tpermissions = unknown, Texpand = unknown> = Required<RolesRecord<Tpermissions>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	roles: RolesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	roles: RolesResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'roles'): RecordService<RolesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
