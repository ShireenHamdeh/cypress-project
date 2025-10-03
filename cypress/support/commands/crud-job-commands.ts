import { IDeleteRequest } from "../api/payload/delete_request";
import { IResponse } from "../api/response/employee_response";
import { HttpMethod } from "../enums/https-enum";

declare global {
  namespace Cypress {
    interface Chainable {
      createJobTitle(
        url: string,
        body: IJobTitle,
        headers?: Record<string, string>
      ): Chainable<Response<IResponse<IJob>>>;

      deleteJobTitle(
        url: string,
        body: IDeleteRequest,
        headers?: Record<string, string>
      ): Chainable<Response<IResponse>>;
    }
  }
}

Cypress.Commands.add(
  "createJobTitle",
  (
    url: string,
    body: IJobTitle,
    headers?: Record<string, string>
  ) => {
    return cy.request<IResponse<IJob>>({
      method: HttpMethod.POST,
      url,
      body,
      headers,
      failOnStatusCode: false,
    });
  }
);

Cypress.Commands.add(
  "deleteJobTitle",
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