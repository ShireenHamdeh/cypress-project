import { APP_MODULE, MODULE_URL_FREG } from "../../enums/modules-enums";

const LOCATORS = {
  mainMenu: ".oxd-main-menu-item",
  headerH: ".oxd-topbar-header-breadcrumb h6",
};

class AdminPage {
  openFromMenu() {
    cy.contains(LOCATORS.mainMenu, APP_MODULE.AMDIN).click();
  }

  validateUrl() {
    cy.url().should("include", MODULE_URL_FREG.ADMIN);
  }

  validateHeader() {
    cy.get(LOCATORS.headerH)
      .should("be.visible")
      .and("contain", APP_MODULE.AMDIN);
  }
}

export const adminPage = new AdminPage();
