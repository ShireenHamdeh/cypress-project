interface ISystemUserRequest {
  username: string;
  password: string;
  status: boolean;
  userRoleId: number;
  empNumber: number | null;
}
