import { JOB_KEY } from "../../enums/job-enum";
import { USER_INFO } from "../../enums/users-enum";

const LOCATORS = {
  EMPLOYEE_NAME: "input[placeholder='Type for hints...']",
  SEARCHED_EMPLOYEE_NAME: "div[role='listbox'].oxd-autocomplete-dropdown",
  SAVE_BTN: 'button[type="submit"]',
  CHECKBOX: "input[type='checkbox']",
  EMPLOYEE_LIST: ".oxd-topbar-body-nav-tab-item",
  EMPLOYEE_CARD: ".oxd-table-cell[role='cell']",
  ITEM_TAB: ".orangehrm-tabs-item",
  JOINED_DATE: 'input[placeholder="yyyy-dd-mm"]',
  JOB_TITLE: ".oxd-select-option",
  ARROW: ".oxd-select-text--after",
  DROP_DOWN: ".oxd-select-dropdown",
  TABLE_CELL: '.oxd-table-cell[role="cell"]',
  TABLE_ROW: ".oxd-table-row--with-border",
};

class EmployeeListPage {
  openEmployeeList() {
    cy.contains(LOCATORS.EMPLOYEE_LIST, "Employee List", {
      timeout: 10000,
    }).click();
  }

  typeEmployeeName() {
    cy.get(LOCATORS.EMPLOYEE_NAME)
      .clear()
      .first()
      .type(USER_INFO.EMPLOYEE_NAME);
    cy.get(LOCATORS.SEARCHED_EMPLOYEE_NAME)
      .contains(USER_INFO.EMPLOYEE_NAME)
      .click();
  }

  openPersionalDetails() {
    cy.get(LOCATORS.EMPLOYEE_CARD).contains(USER_INFO.LAST_NAME).click();
  }

  openJobTab() {
    cy.get(LOCATORS.ITEM_TAB, { timeout: 10000 }).contains(JOB_KEY.JOB).click();
  }

  save() {
    cy.get(LOCATORS.SAVE_BTN).click();
  }

  enterjobDetails() {
    cy.get(LOCATORS.JOINED_DATE).type(JOB_KEY.DATE);
    cy.contains(JOB_KEY.CLOSE).click();

    cy.get(LOCATORS.ARROW).first().click();
    cy.get(LOCATORS.DROP_DOWN)
      .contains(LOCATORS.JOB_TITLE, JOB_KEY.JOB_TITLE)
      .scrollIntoView()
      .should("be.visible")
      .click();
  }

  ValidateMsg() {
    cy.fixture("messeges").as("messeges");
    cy.get("@messeges").then((messeges: any) => {
      cy.contains(messeges.successfullyUpdatedMsg);
    });
  }

  typeJobTitle() {
    cy.get(LOCATORS.ARROW).eq(2).click();
    cy.get(LOCATORS.DROP_DOWN)
      .contains(LOCATORS.JOB_TITLE, JOB_KEY.JOB_TITLE)
      .scrollIntoView()
      .should("be.visible")
      .click();
  }

  validateEmployee() {
    cy.contains(LOCATORS.TABLE_CELL, USER_INFO.LAST_NAME)
      .closest(LOCATORS.TABLE_ROW)
      .within(() => {
        cy.contains(USER_INFO.FIRST_NAME).should("be.visible");
        cy.contains(JOB_KEY.JOB_TITLE).should("be.visible");
      });
  }
}

export const employeeListPage = new EmployeeListPage();
