import { APP_MODULE } from "../../support/enums/modules-enums";
import { buzzPage } from "../../support/pages/buzz-page";

describe("Buzz Test Cases", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });

    cy.openFromMenu(APP_MODULE.Buzz);
    cy.validateHeader(APP_MODULE.Buzz);
  });

  it.only("TC41: User Adds a New Post", () => {
    buzzPage.enterPostContent()
    buzzPage.clickPost()
    buzzPage.verifyMsg()
    cy.openFromMenu(APP_MODULE.Buzz)
    buzzPage.verifyPost()
  });
});
