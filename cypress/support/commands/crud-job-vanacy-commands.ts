import { IDeleteRequest } from "../api/payload/delete_request";
import { IResponse } from "../api/response/employee_response";
import { HttpMethod } from "../enums/https-enum";
import {IJobVacancyRequest} from "../api/payload/job-vanacy-request";
import { IJobVacancy } from "../api/response/job-vanacy";

declare global {
  namespace Cypress {
    interface Chainable {
      createJobVanacy(
        url: string,
        body: IJobVacancyRequest,
        headers?: Record<string, string>
      ): Chainable<Response<IResponse<IJobVacancy>>>;

      deleteJobVanacy(
        url: string,
        body: IDeleteRequest,
        headers?: Record<string, string>
      ): Chainable<Response<IResponse>>;

    }
  }
}

Cypress.Commands.add(
  "createJobVanacy",
  (
    url: string,
    body: IJobVacancyRequest,
    headers?: Record<string, string>
  ) => {
    return cy.request<IResponse<IJobVacancy>>({
      method: HttpMethod.POST,
      url,
      body,
      headers,
      failOnStatusCode: false,
    });
  }
);

Cypress.Commands.add(
  "deleteJobVanacy",
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


