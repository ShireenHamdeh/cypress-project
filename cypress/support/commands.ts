/// <reference types="cypress" />

import { loginPage } from "./pages/login-page";
import { userManagement } from "./pages/admin/user-management-page";
import { MODULE_LOCATORS, MODULE_URL_FREG } from "./enums/modules-enums";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      employeeSearch(role: string, status: string): Chainable<void>;
      openFromMenu(module: string): Chainable<void>;
      validateUrl(moduleFreg: string): Chainable<void>;
      validateHeader(module: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (username: string, password: string) => {
  loginPage.visit();
  loginPage.typeUsername(username);
  loginPage.typePassword(password);
  loginPage.submit();
});

Cypress.Commands.add("employeeSearch", (role: string, status: string) => {
  userManagement.typeSearchUserName();
  userManagement.selectRole(role);
  userManagement.typeEmployeeName();
  userManagement.selectStatus(status);
  userManagement.save();
});

Cypress.Commands.add("openFromMenu", (module: string) => {
  cy.contains(MODULE_LOCATORS.MAIN_MENU, module).should("be.visible").click();
});

Cypress.Commands.add("validateUrl", (moduleFreg: string) => {
  cy.url().should("include", moduleFreg);
});

Cypress.Commands.add("validateHeader", (module: string) => {
  cy.get(MODULE_LOCATORS.HEADER_H).should("be.visible").and("contain", module);
});
