import { LEAVE_KEY } from "../enums/leave-enum";
import { APP_MODULE, MODULE_URL_FREG } from "../enums/modules-enums";
import "cypress-file-upload";
import { USER_INFO } from "../enums/users-enum";

const URLs = {
  LOGIN_URL: "/auth/login",
}
const LOCATORS = {
  ENTITLEMENTS_HEADER: ".oxd-topbar-body-nav-tab-item",
  ADD_TAB: ".oxd-topbar-body-nav-tab-link",
  EMPLOYEE_NAME: "input[placeholder='Type for hints...']",
  SEARCHED_EMPLOYEE_NAME: "div[role='listbox'].oxd-autocomplete-dropdown",
  LEAVE_TYPE: ".oxd-select-text-input",
  LEAVE_ARROW: ".oxd-select-text--after",
  LEAVE_TAB: ".oxd-select-dropdown .oxd-select-option",
  ENTITLEMENTS: "input[class='oxd-input oxd-input--active']",
  SAVE_BTN: "button[type='submit']",
  CONFIRM_BTN: "button.oxd-button--secondary.orangehrm-button-margin",
  LOG_OUT_BTN: ".oxd-userdropdown-tab",
  APPLY_TAB: ".oxd-topbar-body-nav-tab-item",
  DATE: "input[placeholder='yyyy-dd-mm']",
  APPROVE_BTN:
    "button.oxd-button.oxd-button--medium.oxd-button--label-success.oxd-table-cell-action-space",
  TABLE_CELL: '.oxd-table-cell[role="cell"]',
  TABLE_ROW: ".oxd-table-row--with-border"
};

class LeavePage {
  openEntitlements() {
    cy.get(LOCATORS.ENTITLEMENTS_HEADER)
      .contains(LEAVE_KEY.ENTITLEMENTS)
      .click();
  }

  selecAddEntitlements() {
    cy.get(LOCATORS.ADD_TAB).contains(LEAVE_KEY.ADD_ENTITLEMENTS).click();
  }

  typeEmployeeName() {
    cy.get(LOCATORS.EMPLOYEE_NAME).clear().type(USER_INFO.EMPLOYEE_NAME);
    cy.get(LOCATORS.SEARCHED_EMPLOYEE_NAME)
      .contains(USER_INFO.EMPLOYEE_NAME)
      .click();
  }

  selectLeaveType() {
    cy.get(LOCATORS.LEAVE_ARROW).first().click();
    cy.contains(LOCATORS.LEAVE_TAB, LEAVE_KEY.LEAVE_TYPE).click();
  }

  typeEntitlement() {
    cy.get(LOCATORS.ENTITLEMENTS).last().type(LEAVE_KEY.LEAVE_BALANCE);
  }

  save() {
    cy.get(LOCATORS.SAVE_BTN).click();
  }
  confirm() {
    cy.get(LOCATORS.CONFIRM_BTN).contains(LEAVE_KEY.CONFIRM).click();

    cy.fixture("messeges").as("messeges");
    cy.get("@messeges").then((messeges: any) => {
      cy.contains(messeges.successfullyMsg);
    });
  }

  logout() {
    cy.get(LOCATORS.LOG_OUT_BTN).click();
    cy.contains(LEAVE_KEY.LOGOUT).click();

    cy.url().should("include", URLs.LOGIN_URL);
  }

  loginAsEmployee() {
    cy.login(USER_INFO.USERNAME, USER_INFO.PASSWORD);
  }

  loginAsAdmin() {
    cy.fixture("users").as("users");
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });
  }

  applyLeave() {
    cy.get(LOCATORS.APPLY_TAB).contains(LEAVE_KEY.APPLY).click();

    cy.get(LOCATORS.LEAVE_ARROW).click();
    cy.contains(LOCATORS.LEAVE_TAB, LEAVE_KEY.LEAVE_TYPE).click();

    cy.get(LOCATORS.DATE).first().clear().type(LEAVE_KEY.DATE_FROM);
    cy.get(LOCATORS.DATE).last().clear().type(LEAVE_KEY.DATE_AFTER);
    cy.contains(LEAVE_KEY.CLOSE).click();

    cy.get(LOCATORS.SAVE_BTN).click();

    cy.fixture("messeges").as("messeges");
    cy.get("@messeges").then((messeges: any) => {
      cy.contains(messeges.successfullyMsg);
    });
  }

  approve() {
    cy.get(LOCATORS.APPROVE_BTN).contains(LEAVE_KEY.APPROVE).click();

    cy.fixture("messeges").as("messeges");
    cy.get("@messeges").then((messeges: any) => {
      cy.contains(messeges.successfullyUpdatedMsg);
    });
  }

  verifyRecord() {
    cy.contains(LOCATORS.TABLE_CELL, USER_INFO.EMPLOYEE_NAME)
      .closest(LOCATORS.TABLE_ROW)
      .within(() => {
        cy.contains(LEAVE_KEY.LEAVE_PERIOD).should("be.visible");
        cy.contains(LEAVE_KEY.LEAVE_TYPE).should("be.visible");
        cy.contains(LEAVE_KEY.LEAVE_BALANCE).should("be.visible");
        cy.contains(LEAVE_KEY.CANCEL).should("be.visible");
      });
  }
}

export const leavePage = new LeavePage();
