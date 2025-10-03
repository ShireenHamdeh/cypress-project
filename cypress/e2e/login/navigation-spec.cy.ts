import { adminPage } from "../../support/pages/admin/admin-page";
import { loginPage } from "../../support/pages/login-page";

describe("Validate module URLS and headers for all pages", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.fixture("messeges").as("messeges");
    loginPage.visit();
    loginPage.isloaded();
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });
  });

  it("TC11: Shuld open Admin page and validate URL + Header text", () => {
    adminPage.openFromMenu();
    adminPage.validateUrl();
    adminPage.validateHeader();
  });
});
