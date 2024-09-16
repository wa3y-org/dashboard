import type { BaseModel, RecordModel } from "pocketbase";
import type {
  EmployeesRecord,
  EmployeesResponse,
  MembersRecord,
  MembersResponse,
} from "~/app/pocketbase-types";

type TEmployee = EmployeesRecord | EmployeesResponse ;
type TMember = MembersRecord | MembersResponse ;
export type StaffPerson = TEmployee & TMember & RecordModel & BaseModel;

export type TStaff = {
  position: string;
  description: string;
  type: "member" | "employee" | null;
  person: StaffPerson;
} & RecordModel & BaseModel;

export const ProjectsStaffCollection = usePocketBase().collection('projects_staff');

export const ActivitiesStaffCollection = usePocketBase().collection('activities_staff');

