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
import { JobHelper } from "../../support/helpers/job-helper";
import { employeeListPage } from "../../support/pages/pim/employee-list-page";

let createdEmpNumber: number;
let createdJobTitleNumber: number;

describe("Employee List Functionality", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.fixture("employeers").as("employeers");
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });

    cy.openFromMenu(APP_MODULE.PIM);
    employeeListPage.openEmployeeList();

    EmployeeHelper.createEmployee().then((response) => {
      CommonHelper.logResponseStatus(response);
      CommonHelper.logResponseHeaders(response);
      CommonHelper.logResponseBody(response);
      expect(response.status).to.eq(StatusCode.OK);
      createdEmpNumber = Number(response.body.data.empNumber);

      JobHelper.createJobTitle().then((jobTitleResponse) => {
        CommonHelper.logResponseStatus(jobTitleResponse);
        CommonHelper.logResponseHeaders(jobTitleResponse);
        CommonHelper.logResponseBody(jobTitleResponse);
        expect(jobTitleResponse.status).to.eq(StatusCode.OK);
        createdJobTitleNumber = Number(jobTitleResponse.body.data.id);
      });
    });
  });

  afterEach(() => {
    EmployeeHelper.deleteEmployee(Number(createdEmpNumber)).then((response) => {
      CommonHelper.logResponseStatus(response);
      CommonHelper.logResponseHeaders(response);
      CommonHelper.logResponseBody(response);
      expect(response.status).to.eq(StatusCode.OK);

      cy.log("--------------------- " + createdJobTitleNumber)
      JobHelper.deleteJobTitle(Number(createdJobTitleNumber)).then(
        (deletejobTitleResponse) => {
          CommonHelper.logResponseStatus(deletejobTitleResponse);
          CommonHelper.logResponseHeaders(deletejobTitleResponse);
          CommonHelper.logResponseBody(deletejobTitleResponse);
          expect(deletejobTitleResponse.status).to.eq(StatusCode.OK);
        });
    });
  });

  it("TC61: Assign Job Details", () => {
    employeeListPage.typeEmployeeName()
    employeeListPage.save()
    employeeListPage.openPersionalDetails()
    employeeListPage.openJobTab()
    employeeListPage.enterjobDetails()
    employeeListPage.save()
    employeeListPage.ValidateMsg()
    employeeListPage.openEmployeeList()
    employeeListPage.typeJobTitle()
    employeeListPage.save()
    employeeListPage.validateEmployee()
  });
});
