import { IDeleteRequest } from "../api/payload/delete_request";
import { IJobVacancyRequest } from "../api/payload/job-vanacy-request";
import { HeaderKey, HeaderValues } from "../enums/https-enum";
import { JOB_VANACY_KEY, VACANCIES } from "../enums/job-vanacy-enum";

const baseUrl = Cypress.config().baseUrl;

const URLs = {
  JOB_VACANCY_URL: `${baseUrl}/api/v2/recruitment/vacancies`,
};

const headers: Record<string, string> = {
  [HeaderKey.X_API_KEY]: String(HeaderValues.X_API_KEY),
  [HeaderKey.CONTENT_TYPE]: String(HeaderValues.CONTENT_TYPE),
};

export class JobVanacyHelper {
  static createJobVanacy(
    jobTitleNum: number,
    employeeNum: number,
    body?: IJobVacancyRequest
  ) {
    const payload: IJobVacancyRequest = body ?? {
      name: String(VACANCIES.NAME),
      jobTitleId: jobTitleNum,
      employeeId: employeeNum,
      numOfPositions: Number(JOB_VANACY_KEY.POSTION_NUM),
      description: String(VACANCIES.DESCRIPTION),
      status: true,
      isPublished: true,
    };

    return cy.createJobVanacy(URLs.JOB_VACANCY_URL, payload, headers);
  }

  static deleteJobVanacy(jobVanacyNum: number) {
    const payload: IDeleteRequest = {
      ids: [jobVanacyNum],
    };

    return cy.deleteJobVanacy(URLs.JOB_VACANCY_URL, payload, headers);
  }
}
