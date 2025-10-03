export enum UserManagementKey {
  USER_MANAGEMENT = "User Management",
  USERS = "Users",
  ADD = "Add",
  ADD_USER = "Add User",
  USER_NAME = "Username",
  NoRecordsFoundMsg = "No Records Found",
  DeleteMsg = "Successfully Deleted",
}

export enum USER_INFO {
  EMPLOYEE_NAME = "John Smith",
  FIRST_NAME = "John",
  MIDDLE_NAME = "",
  EMPLOYEE_ID = 12345,
  LAST_NAME = "Smith",
  USERNAME = "john.smith.auto",
  PASSWORD = "Test@12345",
  USER_ROLE = "Admin",
  STATUS = "Enabled",
}


export enum Status {
  ENABLED = "Enabled",
  DISABLED = "Disabled",
}

export enum Role {
  ADMIN = "Admin",
  ESS = "ESS",
}

export enum User_Role {
  ADMIN = 1,
  ESS = 2,
}

export enum User_Status {
  ENABLED = "true",
  DISABLED = "",
}

export enum GET_INFO {
  DETAILED = "detailed",
  SUMMARY = "summary",
  ONLY_CURRENT = "onlyCurrent",
  ALL = "all",
  ASC = "ASC",
  DESC = "DESC",
  SORT_BY_FIRSTNAME = "employee.firstName",
  SORT_BY_DATE_OF_APPLICATION="candidate.dateOfApplication",
  LIST_MODEL = "list"
}

