import { StatusCode } from "../../support/enums/https-enum";
import { APP_MODULE } from "../../support/enums/modules-enums";
import { USER_INFO, User_Role } from "../../support/enums/users-enum";
import { CommonHelper } from "../../support/helpers/common-helper";
import { EmployeeHelper } from "../../support/helpers/employee-helper";
import { SystemUserHelper } from "../../support/helpers/system-user-helper";
import { leavePage } from "../../support/pages/leave-page";
import { loginPage } from "../../support/pages/login-page";

let createdEmpNumber: number;
describe("Leave Test Cases", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });

    cy.openFromMenu(APP_MODULE.LEAVE);
    cy.validateHeader(APP_MODULE.LEAVE);
  });

  it.only("TC31: Employee Applies, Admin Approves, Employee Checks Status", () => {
    EmployeeHelper.createEmployee()
      .then((response) => {
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
            leavePage.openEntitlements();
            leavePage.selecAddEntitlements();
            leavePage.typeEmployeeName();
            leavePage.selectLeaveType();
            leavePage.typeEntitlement();
            leavePage.save();
            leavePage.confirm();

            leavePage.logout();
            leavePage.loginAsEmployee();
            cy.openFromMenu(APP_MODULE.LEAVE);
            leavePage.applyLeave();

            leavePage.logout();
            leavePage.loginAsAdmin();
            cy.openFromMenu(APP_MODULE.LEAVE);
            leavePage.approve();

            leavePage.logout();
            leavePage.loginAsEmployee();
            cy.openFromMenu(APP_MODULE.LEAVE);
            leavePage.verifyRecord();

            leavePage.logout();
            leavePage.loginAsAdmin();
          }
        );
      })
      .then(() => {
        EmployeeHelper.deleteEmployee(Number(createdEmpNumber)).then(
          (deleteResponse) => {
            CommonHelper.logResponseStatus(deleteResponse);
            CommonHelper.logResponseBody(deleteResponse);
            expect(deleteResponse.status).to.eq(StatusCode.OK);
          }
        );
      });
  });
});
