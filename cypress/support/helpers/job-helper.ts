import { IDeleteRequest } from "../api/payload/delete_request";
import { IJobDetailsRequest } from "../api/payload/job-details-request";
import { HeaderKey, HeaderValues } from "../enums/https-enum";
import { JOB_KEY } from "../enums/job-enum";

const baseUrl = Cypress.config().baseUrl;

const URLs = {
  JOB_TITLE_URL: `${baseUrl}/api/v2/admin/job-titles`,
};

const headers: Record<string, string> = {
  [HeaderKey.X_API_KEY]: String(HeaderValues.X_API_KEY),
  [HeaderKey.CONTENT_TYPE]: String(HeaderValues.CONTENT_TYPE),
};

export class JobHelper {
  static createJobTitle(body?: IJobTitle) {
    const payload: IJobTitle = body ?? {
      title: JOB_KEY.JOB_TITLE,
      description: "",
      specification: null,
      note: "",
    };

    return cy.createJobTitle(URLs.JOB_TITLE_URL, payload, headers);
  }

  static deleteJobTitle(jobNumber: number) {
    const payload: IDeleteRequest = {
      ids: [jobNumber],
    };

    return cy.deleteJobTitle(URLs.JOB_TITLE_URL, payload, headers);
  }
}
