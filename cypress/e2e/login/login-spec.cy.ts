import { dashbordPage } from "../../support/pages/dashboard-page";
import { loginPage } from "../../support/pages/login-page";

describe("Login Test Cases", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.fixture("messeges").as("messeges");
    loginPage.visit();
    loginPage.isloaded();
  });

  it("TC01: Should login successfully with valid username and password", () => {
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });

    dashbordPage.isLoaded();
  });

  it("TC02: Should show error for valid username and invalid password", () => {
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.invalid.password);
    });

    cy.get("@messeges").then((messeges: any) => {
      loginPage.assertInvalidCredentials(messeges.invalidCreds);
    });
  });

  it("TC03: Should show error for invalid username and valid password", () => {
    cy.get("@users").then((users: any) => {
      cy.login(users.invalid.username, users.valid.password);
    });

    cy.get("@messeges").then((messeges: any) => {
      loginPage.assertInvalidCredentials(messeges.invalidCreds);
    });
  });

  it("TC04: Should show error for invalid username and invalid password", () => {
    cy.get("@users").then((users: any) => {
      cy.login(users.invalid.username, users.invalid.password);
    });

    cy.get("@messeges").then((messeges: any) => {
      loginPage.assertInvalidCredentials(messeges.invalidCreds);
    });
  });

  it("TC05: Should show required message when username is empty and password is valid", () => {
    cy.get("@users").then((users: any) => {
      loginPage.clearUsername();
      loginPage.typePassword(users.valid.password);
      loginPage.submit();
    });

    cy.get("@messeges").then((messeges: any) => {
      loginPage.asserRequiredAt(0, messeges.required);
    });
  });

  it("TC06: Should show required message when username is empty and password is invalid", () => {
    cy.get("@users").then((users: any) => {
      loginPage.clearUsername();
      loginPage.typePassword(users.invalid.password);
      loginPage.submit();
    });

    cy.get("@messeges").then((messeges: any) => {
      loginPage.asserRequiredAt(0, messeges.required);
    });
  });

  it("TC07: Should show required message when password is empty and username is valid", () => {
    cy.get("@users").then((users: any) => {
      loginPage.typeUsername(users.valid.username);
      loginPage.clearPassword();
      loginPage.submit();
    });

    cy.get("@messeges").then((messeges: any) => {
      loginPage.asserRequiredAt(0, messeges.required);
    });
  });

  it("TC08: Should show required message when password is empty and username is invalid", () => {
    cy.get("@users").then((users: any) => {
      loginPage.typeUsername(users.invalid.username);
      loginPage.clearPassword();
      loginPage.submit();
    });

    cy.get("@messeges").then((messeges: any) => {
      loginPage.asserRequiredAt(0, messeges.required);
    });
  });

  it("TC09: Should show required messages when both username and password are empty", () => {
    cy.get("@users").then((users: any) => {
      loginPage.clearUsername();
      loginPage.clearPassword();
      loginPage.submit();
    });

    cy.get("@messeges").then((messeges: any) => {
      loginPage.asserRequiredAt(0, messeges.required);
      loginPage.asserRequiredAt(1, messeges.required);
    });
  });

  it("TC10: Should mask password input by default", () => {
    loginPage.passwordShouldBeMasked();
  });
});
