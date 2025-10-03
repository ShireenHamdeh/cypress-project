export class CommonHelper {

  static logResponseStatus<T>(resp: Cypress.Response<T>): void {
    cy.log(`RESPONSE STATUS: ${resp.status}`)
  }

  static logResponseHeaders<T>(resp: Cypress.Response<T>): void {
    cy.log(`HEADERS: ${JSON.stringify(resp.headers)}`)
  }

  static logResponseBody<ICreateUserResponse>(resp: Cypress.Response<ICreateUserResponse>): void {
    cy.log(`BODY: ${JSON.stringify(resp.body)}`)
  }

  static logResponseFirstBody(resp: Cypress.Response<any>): void {
    cy.log('First user details: ' + JSON.stringify(resp.body.data[0]))
  }
}