import { StatusCode } from "../../support/enums/https-enum";
import { APP_MODULE } from "../../support/enums/modules-enums";
import { CommonHelper } from "../../support/helpers/common-helper";
import { EmployeeHelper } from "../../support/helpers/employee-helper";
import { pimPage } from "../../support/pages/pim/pim-page";

let createdEmpNumber: number;

describe("PIM Test Cases", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.fixture("employeers").as("employeers");
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });

    cy.openFromMenu(APP_MODULE.PIM);
    cy.validateHeader(APP_MODULE.PIM);
  });

  it.skip("TC21: Should add user successfully", () => {
    pimPage.openAddEmployee();

    cy.get("@employeers").then((employeers: any) => {
      pimPage.typeFirstName(employeers.firstname);
      pimPage.typeMiddleName(employeers.middlename);
      pimPage.typeLastName(employeers.lastname);
      pimPage.typeEmployeeId(employeers.employeerId);
    });
  });
  it("TC22: Add Employee with Photo & Login Details", () => {
    pimPage.openAddEmployee();

    cy.get("@employeers").then((employeers: any) => {
      pimPage.typeFirstName(employeers.firstname);
      pimPage.typeMiddleName(employeers.middlename);
      pimPage.typeLastName(employeers.lastname);
      pimPage.typeEmployeeId(employeers.employeerId);

      pimPage.uploadPic();
      pimPage.clickCreateLoginDetailsBtn();
      pimPage.typeUserName(employeers.fullname);
      pimPage.typePassword(employeers.password);
      pimPage.save();

      pimPage.validateMsg();
      pimPage.validateEmployeeImage();
      pimPage.openEmployeeList();

      EmployeeHelper.getEmployee().then((response) => {
        CommonHelper.logResponseStatus(response);
        CommonHelper.logResponseBody(response);
        expect(response.status).to.eq(StatusCode.OK);

        createdEmpNumber = Number(response.body.data[0].empNumber);

        EmployeeHelper.deleteEmployee(createdEmpNumber).then((deleteResp) => {
          CommonHelper.logResponseStatus(deleteResp);
          CommonHelper.logResponseBody(deleteResp);
          expect(deleteResp.status).to.eq(StatusCode.OK);
        });
      });
    });
  });

  it("TC23: Add Employee Validation Errors", () => {
    pimPage.openAddEmployee();
    cy.get("@employeers").then((employeers: any) => {
      pimPage.typeLastName(employeers.lastname);
      pimPage.typeEmployeeId(employeers.employeerId);
      pimPage.save();
      pimPage.checkRequiredMsg();

      pimPage.uplaodInvalidPic();

      pimPage.clickCreateLoginDetailsBtn();
      pimPage.typeShortPassword();
      pimPage.save();
    });
  });
});
