import { ICreateEmployeeRequest } from "../api/payload/create_employee";
import { IDeleteRequest } from "../api/payload/delete_request";
import { IGetEmployeeRequest } from "../api/payload/get_employee";
import { IJobDetailsRequest } from "../api/payload/job-details-request";
import { HeaderKey, HeaderValues } from "../enums/https-enum";
import { GET_INFO, USER_INFO } from "../enums/users-enum";

const baseUrl = Cypress.config().baseUrl;

const URLs = {
  PIM_EMPLOYEERS_URL: `${baseUrl}/api/v2/pim/employees`,
  EMPLOYMENT_CONTRACT_URL: (employeeId: number | string) =>
    `${URLs.PIM_EMPLOYEERS_URL}/${employeeId}/employment-contract`,
  JOB_DETAILS_URL:  (employeeId: number | string) =>`${URLs.PIM_EMPLOYEERS_URL}/${employeeId}/job-details`
};

const headers: Record<string, string> = {
  [HeaderKey.X_API_KEY]: String(HeaderValues.X_API_KEY),
  [HeaderKey.CONTENT_TYPE]: String(HeaderValues.CONTENT_TYPE),
};

export class EmployeeHelper {
  static createEmployee(body?: ICreateEmployeeRequest) {
    const payload: ICreateEmployeeRequest = body ?? {
      empPicture: null,
      firstName: String(USER_INFO.FIRST_NAME),
      lastName: String(USER_INFO.LAST_NAME),
      middleName: String(USER_INFO.MIDDLE_NAME),
    };

    return cy.createEmployee(URLs.PIM_EMPLOYEERS_URL, payload, headers);
  }

  static deleteEmployee(empNumber: number) {
    const payload: IDeleteRequest = {
      ids: [empNumber],
    };

    return cy.deleteEmployee(URLs.PIM_EMPLOYEERS_URL, payload, headers);
  }

  static getEmployee(empId?: number) {
    const requestParams: IGetEmployeeRequest = {
      limit: 50,
      offset: 0,
      model: GET_INFO.DETAILED,
      employeeId: empId ?? Number(USER_INFO.EMPLOYEE_ID),
      includeEmployees: GET_INFO.ONLY_CURRENT,
      sortField: GET_INFO.SORT_BY_FIRSTNAME,
      sortOrder: GET_INFO.ASC,
    };

    return cy.getEmployee(URLs.PIM_EMPLOYEERS_URL, requestParams, headers);
  }

  static updateEmploymentContract(
    employeeId: number | string,
    body?: IEmploymentContractRequest
  ) {
    const payload: IEmploymentContractRequest = body ?? {
      startDate: null,
      endDate: null,
    };

    return cy.updateEmploymentContract(
      URLs.EMPLOYMENT_CONTRACT_URL(employeeId),
      payload,
      headers
    );
  }

  static updateJobDetails(employeeId: number, jobTitleId:number, body?: IJobDetailsRequest) {
  const payload: IJobDetailsRequest = body ?? {
    joinedDate: null,
    jobTitleId: jobTitleId,
  };

  return cy.updateJobDetails(
    `${URLs.PIM_EMPLOYEERS_URL}/${employeeId}/job-details`,
    payload,
    headers
  );
}
}
