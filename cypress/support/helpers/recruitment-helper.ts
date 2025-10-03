import { StatusCode } from "../enums/https-enum";
import { JOB_KEY } from "../enums/job-enum";
import { CommonHelper } from "./common-helper";
import { EmployeeHelper } from "./employee-helper";
import { JobHelper } from "./job-helper";
import { JobVanacyHelper } from "./job-vanacy-helper";

let createdEmpNumber: number;
let createdJobTitleNumber: number;
let createdJobVanacyNum: number;

class RecruitmentHelper {
  prepareVacancy() {
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

        EmployeeHelper.updateJobDetails(
          createdEmpNumber,
          JOB_KEY.HR_MANAGER_ID
        ).then((updateJobResp) => {
          CommonHelper.logResponseStatus(updateJobResp);
          CommonHelper.logResponseHeaders(updateJobResp);
          CommonHelper.logResponseBody(updateJobResp);
          expect(updateJobResp.status).to.eq(StatusCode.OK);

          EmployeeHelper.updateEmploymentContract(createdEmpNumber).then(
            (updateResp) => {
              CommonHelper.logResponseStatus(updateResp);
              CommonHelper.logResponseHeaders(updateResp);
              CommonHelper.logResponseBody(updateResp);
              expect(updateResp.status).to.eq(StatusCode.OK);

              JobVanacyHelper.createJobVanacy(
                createdJobTitleNumber,
                createdEmpNumber
              ).then((vanacyResp) => {
                CommonHelper.logResponseStatus(vanacyResp);
                CommonHelper.logResponseHeaders(vanacyResp);
                CommonHelper.logResponseBody(vanacyResp);
                expect(vanacyResp.status).to.eq(StatusCode.OK);
                createdJobVanacyNum = Number(vanacyResp.body.data.id);
              });
            }
          );
        });
      });
    });
  }

  cleanupEntities() {
    cy.log("--------------------- " + createdJobVanacyNum);
    JobVanacyHelper.deleteJobVanacy(Number(createdJobVanacyNum)).then(
      (deleteVanacyResp) => {
        CommonHelper.logResponseStatus(deleteVanacyResp);
        CommonHelper.logResponseHeaders(deleteVanacyResp);
        CommonHelper.logResponseBody(deleteVanacyResp);
        expect(deleteVanacyResp.status).to.eq(StatusCode.OK);

        cy.log("--------------------- " + createdEmpNumber);
        EmployeeHelper.deleteEmployee(Number(createdEmpNumber)).then(
          (response) => {
            CommonHelper.logResponseStatus(response);
            CommonHelper.logResponseHeaders(response);
            CommonHelper.logResponseBody(response);
            expect(response.status).to.eq(StatusCode.OK);

            cy.log("--------------------- " + createdJobTitleNumber);
            JobHelper.deleteJobTitle(Number(createdJobTitleNumber)).then(
              (deletejobTitleResponse) => {
                CommonHelper.logResponseStatus(deletejobTitleResponse);
                CommonHelper.logResponseHeaders(deletejobTitleResponse);
                CommonHelper.logResponseBody(deletejobTitleResponse);
                expect(deletejobTitleResponse.status).to.eq(StatusCode.OK);
              }
            );
          }
        );
      }
    );
  }
}

export const recruitmentHelper = new RecruitmentHelper();
