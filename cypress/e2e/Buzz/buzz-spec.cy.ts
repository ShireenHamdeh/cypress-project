import { StatusCode } from "../../support/enums/https-enum";
import { APP_MODULE } from "../../support/enums/modules-enums";
import { User_Role } from "../../support/enums/users-enum";
import { CommonHelper } from "../../support/helpers/common-helper";
import { EmployeeHelper } from "../../support/helpers/employee-helper";
import { SystemUserHelper } from "../../support/helpers/system-user-helper";
import { buzzPage } from "../../support/pages/buzz-page";

let createdEmpNumber: number;

describe("Buzz Test Cases", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.fixture("employeers").as("employeers");
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });

    EmployeeHelper.createEmployee().then((response) => {
      CommonHelper.logResponseStatus(response);
      CommonHelper.logResponseHeaders(response);
      CommonHelper.logResponseBody(response);
      expect(response.status).to.eq(StatusCode.OK);

      createdEmpNumber = Number(response.body.data.empNumber);

      SystemUserHelper.createSystemUser(createdEmpNumber, User_Role.ESS).then(
        (resp) => {
          CommonHelper.logResponseStatus(resp);
          CommonHelper.logResponseHeaders(resp);
          CommonHelper.logResponseBody(resp);
          expect(resp.status).to.eq(StatusCode.OK);
        }
      );
    });
  });

  afterEach(() => {
    EmployeeHelper.deleteEmployee(Number(createdEmpNumber)).then(
      (deleteResponse) => {
        CommonHelper.logResponseStatus(deleteResponse);
        CommonHelper.logResponseBody(deleteResponse);
        expect(deleteResponse.status).to.eq(StatusCode.OK);
      }
    );
  });

  it.only("TC41: User Adds a New Post", () => {
    buzzPage.logout();
    buzzPage.loginAsEmployee();
    cy.openFromMenu(APP_MODULE.BUZZ);
    cy.validateHeader(APP_MODULE.BUZZ);
    buzzPage.enterPostContent();
    buzzPage.clickPost();
    cy.openFromMenu(APP_MODULE.BUZZ);
    buzzPage.verifyPost();
    buzzPage.verifyMsg();
    buzzPage.logout();
    buzzPage.loginAsAdmin();
  });
});
