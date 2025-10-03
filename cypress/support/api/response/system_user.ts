import { IEmployee } from "./employee";
import { IUserRole } from "./user_role";

export interface ISystemUser {
  id: number;
  userName: string;
  deleted: boolean;
  status: boolean;
  employee: IEmployee;
  userRole: IUserRole;
}
