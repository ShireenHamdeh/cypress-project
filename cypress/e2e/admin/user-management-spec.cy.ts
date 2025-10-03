import { ResponseKey, StatusCode } from "../../support/enums/https-enum";
import { APP_MODULE } from "../../support/enums/modules-enums";
import {
  USER_INFO,
  Role,
  Status,
  UserManagementKey,
} from "../../support/enums/users-enum";
import { CommonHelper } from "../../support/helpers/common-helper";
import { EmployeeHelper } from "../../support/helpers/employee-helper";
import { SystemUserHelper } from "../../support/helpers/system-user-helper";
import { userManagement } from "../../support/pages/admin/user-management-page";

let createdEmpNumber: number;

describe("User Management Functionality", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.fixture("employeers").as("employeers");
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });

    cy.openFromMenu(APP_MODULE.AMDIN);
    userManagement.openUserManagement();
    userManagement.selectUsersTab();

    EmployeeHelper.createEmployee().then((response) => {
      CommonHelper.logResponseStatus(response);
      CommonHelper.logResponseBody(response);
      CommonHelper.logResponseBody(response);
      expect(response.status).to.eq(StatusCode.OK);
      createdEmpNumber = Number(response.body.data.empNumber);
    });
  });

  afterEach(() => {
    EmployeeHelper.deleteEmployee(Number(createdEmpNumber)).then((response) => {
      CommonHelper.logResponseStatus(response);
      CommonHelper.logResponseBody(response);
      CommonHelper.logResponseBody(response);
      expect(response.status).to.eq(StatusCode.OK);
    });
  });
  it("TC11: should add a new Admin user successfully", () => {
    userManagement.clickAdd();

    userManagement.selectRole(Role.ADMIN);
    userManagement.typeEmployeeName();
    userManagement.selectStatus(Status.ENABLED);
    userManagement.typeUserName();
    userManagement.typePassword();
    userManagement.save();
    userManagement.validateAddedUser();
  });

  it("TC12: User Search by Username, Role, Name and Status", () => {
    SystemUserHelper.createSystemUser(createdEmpNumber).then((response) => {
      CommonHelper.logResponseStatus(response);
      CommonHelper.logResponseBody(response);
      CommonHelper.logResponseBody(response);
      expect(response.status).to.eq(StatusCode.OK);

      cy.employeeSearch(Role.ADMIN, Status.ENABLED);
      userManagement.validateTable(
        USER_INFO.USERNAME,
        USER_INFO.EMPLOYEE_NAME,
        USER_INFO.USER_ROLE,
        USER_INFO.STATUS
      );
    });
  });

  it("TC13: Edit User Role and status", () => {
    SystemUserHelper.createSystemUser(createdEmpNumber).then((response) => {
      CommonHelper.logResponseStatus(response);
      CommonHelper.logResponseBody(response);
      CommonHelper.logResponseBody(response);
      expect(response.status).to.eq(StatusCode.OK);

      cy.employeeSearch(Role.ADMIN, Status.ENABLED);
      userManagement.clickEdit();
      userManagement.selectRole(Role.ESS);
      userManagement.selectStatus(Status.DISABLED);
      userManagement.save();

      cy.employeeSearch(Role.ESS, Status.DISABLED);

      userManagement.validateTable(
        USER_INFO.USERNAME,
        USER_INFO.EMPLOYEE_NAME,
        Role.ESS,
        Status.DISABLED
      );
    });
  });

  it("TC14: Delete User from the system", () => {
    SystemUserHelper.createSystemUser(createdEmpNumber).then((response) => {
      CommonHelper.logResponseStatus(response);
      CommonHelper.logResponseBody(response);
      CommonHelper.logResponseBody(response);
      expect(response.status).to.eq(StatusCode.OK);

      cy.employeeSearch(Role.ADMIN, Status.ENABLED);
      userManagement.clickDelete();
      userManagement.clickEnsureBtn();
      cy.contains(UserManagementKey.DeleteMsg);
      cy.employeeSearch(Role.ADMIN, Status.ENABLED);
      cy.contains(UserManagementKey.NoRecordsFoundMsg);
    });
  });
});
