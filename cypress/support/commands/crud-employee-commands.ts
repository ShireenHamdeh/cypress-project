import { ICreateEmployeeRequest } from "../api/payload/create_employee";
import { IDeleteRequest } from "../api/payload/delete_request";
import { IGetEmployeeRequest } from "../api/payload/get_employee";
import { IJobDetailsRequest } from "../api/payload/job-details-request";
import { IEmploymentContractResponse } from "../api/response/contract-response";
import { IEmployee } from "../api/response/employee";
import { IResponse } from "../api/response/employee_response";
import { IGetResponse } from "../api/response/get_response";
import { IJobDetails } from "../api/response/job-details/job-details";
import { HttpMethod } from "../enums/https-enum";

declare global {
  namespace Cypress {
    interface Chainable {
      createEmployee(
        url: string,
        body: ICreateEmployeeRequest,
        headers?: Record<string, string>
      ): Chainable<Response<IResponse<IEmployee>>>;

      deleteEmployee(
        url: string,
        body: IDeleteRequest,
        headers?: Record<string, string>
      ): Chainable<Response<IResponse>>;

      getEmployee(
        url: string,
        body: IGetEmployeeRequest,
        headers?: Record<string, string>
      ): Chainable<Response<IGetResponse<IEmployee>>>;

      updateEmploymentContract(
        url: string,
        body: IEmploymentContractRequest,
        headers?: Record<string, string>
      ):Chainable<Response<IEmploymentContractResponse>>;


      updateJobDetails(
         url: string,
        body: IJobDetailsRequest,
        headers?: Record<string, string>
      ): Chainable<Response<IResponse<IJobDetails>>>;
    }
  }
}

Cypress.Commands.add(
  "createEmployee",
  (
    url: string,
    body: ICreateEmployeeRequest,
    headers?: Record<string, string>
  ) => {
    return cy.request<IResponse<IEmployee>>({
      method: HttpMethod.POST,
      url,
      body,
      headers,
      failOnStatusCode: false,
    });
  }
);

Cypress.Commands.add(
  "deleteEmployee",
  (url: string, body: IDeleteRequest, headers?: Record<string, string>) => {
    return cy.request<IResponse>({
      method: HttpMethod.DELETE,
      url,
      body,
      headers,
      failOnStatusCode: false,
    });
  }
);

Cypress.Commands.add(
  "getEmployee",
  (
    url: string,
    query: IGetEmployeeRequest,
    headers?: Record<string, string>
  ) => {
    return cy.request<IGetResponse<IEmployee>>({
      method: HttpMethod.GET,
      url,
      qs: query,
      headers,
      failOnStatusCode: false,
    });
  }
);

Cypress.Commands.add(
  "updateEmploymentContract",
  (
    url: string,
    body: IEmploymentContractRequest,
    headers?: Record<string, string>
  ) => {
    return cy.request<IEmploymentContractResponse>({
      method: HttpMethod.PUT,
      url,
      body,
      headers,
      failOnStatusCode: false,
    });
  }
);

Cypress.Commands.add(
  "updateJobDetails",
  (
    url: string,
    body: IJobDetailsRequest,
    headers?: Record<string, string>
  ) => {
    return cy.request<IResponse<IJobDetails>>({
      method: HttpMethod.PUT,
      url,
      body,
      headers,
      failOnStatusCode: false,
    });
  }
);

