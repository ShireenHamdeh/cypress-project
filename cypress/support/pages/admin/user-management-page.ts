import {
  USER_INFO,
  Role,
  Status,
  UserManagementKey,
} from "../../enums/users-enum";

const LOCATORS = {
  USER_MANAGEMENT_HEADER: ".oxd-topbar-body-nav-tab-item",
  USER_TAB: ".oxd-topbar-body-nav-tab-link",
  ADD_BTN: "button.oxd-button.oxd-button--medium.oxd-button--secondary",
  USER_ROLE_ARROW: ".oxd-select-text--after",
  ROLE_TAB_OPTIONS: ".oxd-select-dropdown .oxd-select-option",
  EMPLOYEE_NAME: "input[placeholder='Type for hints...']",
  SEARCHED_EMPLOYEE_NAME: "div[role='listbox'].oxd-autocomplete-dropdown",
  STATUS_ARROW: ".oxd-select-text--after",
  STATUS_TAB: ".oxd-select-dropdown .oxd-select-option",
  USERNAME: "input[autocomplete='off']",
  PASSWORD: "input[type='password']",
  SAVE_BTN: "button[type='submit']",
  TABLE_COL: ".oxd-table-cell",
  TABLE: ".card-center",
  SEARCHED_USERNAME: "input.oxd-input.oxd-input--active",
  DELETE_BTN: ".oxd-icon.bi-trash",
  EDIT_BTN: ".oxd-icon.bi-pencil-fill",
  ENSURE_DELETE_BTN:
    "button.oxd-button.oxd-button--medium.oxd-button--label-danger.orangehrm-button-margin",
};

class UserManagement {
  openUserManagement() {
    cy.get(LOCATORS.USER_MANAGEMENT_HEADER)
      .contains(UserManagementKey.USER_MANAGEMENT)
      .click();
  }

  selectUsersTab() {
    cy.get(LOCATORS.USER_TAB).contains(UserManagementKey.USERS).click();
  }

  clickAdd() {
    cy.get(LOCATORS.ADD_BTN).contains(UserManagementKey.ADD).click();
    cy.contains(UserManagementKey.ADD_USER).should("be.visible");
  }

  selectRole(role: string) {
    cy.get(LOCATORS.USER_ROLE_ARROW).first().click();
    cy.contains(LOCATORS.ROLE_TAB_OPTIONS, role).click();
  }

  typeEmployeeName() {
    cy.get(LOCATORS.EMPLOYEE_NAME).clear().type(USER_INFO.EMPLOYEE_NAME);
    cy.get(LOCATORS.SEARCHED_EMPLOYEE_NAME)
      .contains(USER_INFO.EMPLOYEE_NAME)
      .click();
  }

  selectStatus(status: string) {
    cy.get(LOCATORS.STATUS_ARROW).last().click();
    cy.contains(LOCATORS.STATUS_TAB, status).click();
  }

  typeUserName() {
    cy.get(LOCATORS.USERNAME).first().clear().type(USER_INFO.USERNAME);
  }

  typeSearchUserName() {
    cy.get(LOCATORS.SEARCHED_USERNAME).last().clear().type(USER_INFO.USERNAME);
  }

  typePassword() {
    cy.get(LOCATORS.PASSWORD).first().clear().type(USER_INFO.PASSWORD);
    cy.get(LOCATORS.PASSWORD).last().clear().type(USER_INFO.PASSWORD);
  }

  save() {
    cy.get(LOCATORS.SAVE_BTN).click();
  }

  validateTable(
    username: string,
    empName: string,
    role: string,
    status: string
  ) {
    cy.get(LOCATORS.TABLE_COL).should("contain.text", username);
    cy.get(LOCATORS.TABLE_COL).should("contain.text", empName);
    cy.get(LOCATORS.TABLE_COL).should("contain.text", role);
    cy.get(LOCATORS.TABLE_COL).should("contain.text", status);
  }

  validateAddedUser() {
    cy.contains(USER_INFO.USERNAME, { timeout: 10000 }).should("be.visible");
  }

  clickDelete() {
    cy.get(LOCATORS.DELETE_BTN).first().click();
  }

  clickEnsureBtn() {
    cy.get(LOCATORS.ENSURE_DELETE_BTN).click();
  }

  clickEdit() {
    cy.get(LOCATORS.EDIT_BTN).click();
  }
}

export const userManagement = new UserManagement();
