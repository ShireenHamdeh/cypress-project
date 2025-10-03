import { IDeleteRequest } from "../api/payload/delete_request";
import { IResponse } from "../api/response/employee_response";
import { ISystemUser } from "../api/response/system_user";
import { HttpMethod } from "../enums/https-enum";

declare global {
  namespace Cypress {
    interface Chainable {
      createHiringManager(
        url: string,
        body: ISystemUserRequest,
        headers?: Record<string, string>
      ): Chainable<Response<IResponse<ISystemUser>>>;

      deleteHiringManager(
        url: string,
        body: IDeleteRequest,
        headers?: Record<string, string>
      ): Chainable<Response<IResponse>>;
    }
  }
}

Cypress.Commands.add(
  "createHiringManager",
  (url: string, body: ISystemUserRequest, headers?: Record<string, string>) => {
    return cy.request<IResponse<ISystemUser>>({
      method: HttpMethod.POST,
      url,
      body,
      headers,
      failOnStatusCode: false,
    });
  }
);

Cypress.Commands.add(
  "deleteHiringManager",
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
