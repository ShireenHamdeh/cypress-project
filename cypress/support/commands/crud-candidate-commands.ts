import { ICreateEmployeeRequest } from "../api/payload/create_employee";
import { IDeleteRequest } from "../api/payload/delete_request";
import { IGetCandidateRequest } from "../api/payload/get-candidate";
import { IGetEmployeeRequest } from "../api/payload/get_employee";
import { IJobDetailsRequest } from "../api/payload/job-details-request";
import { IEmploymentContractResponse } from "../api/response/contract-response";
import { IEmployee } from "../api/response/employee";
import { IResponse } from "../api/response/employee_response";
import { IGetResponse } from "../api/response/get_response";
import { IJobApplication } from "../api/response/job-application";
import { IJobDetails } from "../api/response/job-details/job-details";
import { HttpMethod } from "../enums/https-enum";

declare global {
  namespace Cypress {
    interface Chainable {
     
      deleteCandidate(
        url: string,
        body: IDeleteRequest,
        headers?: Record<string, string>
      ): Chainable<Response<IResponse>>;

      getCandidate(
        url: string,
        query: IGetCandidateRequest,
        headers?: Record<string, string>
      ): Chainable<Response<IGetResponse<IJobApplication>>>;
    }
  }
}


Cypress.Commands.add(
  "deleteCandidate",
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
  "getCandidate",
  (
    url: string,
    query: IGetCandidateRequest,
    headers?: Record<string, string>
  ) => {
    return cy.request<IGetResponse<IJobApplication>>({
      method: HttpMethod.GET,
      url,
      qs: query,
      headers,
      failOnStatusCode: false,
    });
  }
);





