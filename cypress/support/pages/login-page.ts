// locators for login page

const LOGIN_LOCATORS = {
  USERNAME: 'input[name="username"]',
  PASSWORD: 'input[name="password"]',
  SUBMIT_BTN: 'button[type="submit"]',
  RIQUIRED_MSG: ".oxd-input-group__message",
}

export class LoginPage {
  visit() {
    cy.visit("/");
  }

  isloaded() {
    cy.get(LOGIN_LOCATORS.USERNAME).should("be.visible");
  }

  typeUsername(value: string) {
    cy.get(LOGIN_LOCATORS.USERNAME).type(value);
  }

  clearUsername() {
    cy.get(LOGIN_LOCATORS.USERNAME).clear();
  }
  typePassword(value: string) {
    cy.get(LOGIN_LOCATORS.PASSWORD).type(value);
  }

  clearPassword() {
    cy.get(LOGIN_LOCATORS.PASSWORD).clear();
  }

  submit() {
    cy.get(LOGIN_LOCATORS.SUBMIT_BTN).click();
  }

  passwordShouldBeMasked() {
    cy.get(LOGIN_LOCATORS.PASSWORD).should("have.attr", "type", "password");
  }

  asserRequiredAt(index: number, text: string) {
    cy.get(LOGIN_LOCATORS.RIQUIRED_MSG).eq(index).should("contain", text);
  }

  assertInvalidCredentials(text: string) {
    cy.contains(text).should("be.visible");
  }
}

export const loginPage = new LoginPage();
