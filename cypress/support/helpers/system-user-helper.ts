import { IDeleteRequest } from "../api/payload/delete_request";
import { HeaderKey, HeaderValues } from "../enums/https-enum";
import {USER_INFO, User_Role, User_Status } from "../enums/users-enum";

const baseUrl = Cypress.config().baseUrl;

const URLs = {
  SYSTSEM_USER_URL: `${baseUrl}/api/v2/admin/users`,
};

const headers: Record<string, string> = {
  [HeaderKey.X_API_KEY]: String(HeaderValues.X_API_KEY),
  [HeaderKey.CONTENT_TYPE]: String(HeaderValues.CONTENT_TYPE),
};

export class SystemUserHelper {
  static createSystemUser(empNumber?: number, userRoleId?:number, body?: ISystemUserRequest) {
    const payload: ISystemUserRequest = body ?? {
      username: String(USER_INFO.USERNAME),
      password: String(USER_INFO.PASSWORD),
      status: Boolean(User_Status.ENABLED),
      userRoleId: userRoleId?? User_Role.ADMIN,
      empNumber: empNumber ?? 0,
    };

    return cy.createSystemUser(URLs.SYSTSEM_USER_URL, payload, headers);
  }

  
  static deleteSystemUser(empNumber: number) {
   const payload: IDeleteRequest = {
      ids: [empNumber],
    };

    return cy.deleteSystemUser(URLs.SYSTSEM_USER_URL, payload, headers);
  }
    
}
