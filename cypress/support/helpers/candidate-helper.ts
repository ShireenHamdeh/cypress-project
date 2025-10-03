import { IDeleteRequest } from "../api/payload/delete_request";
import { IGetCandidateRequest } from "../api/payload/get-candidate";
import { HeaderKey, HeaderValues } from "../enums/https-enum";
import { GET_INFO, USER_INFO } from "../enums/users-enum";

const baseUrl = Cypress.config().baseUrl;

const URLs = {
  CANDIDATE_URL: `${baseUrl}api/v2/recruitment/candidates`,
};

const headers: Record<string, string> = {
  [HeaderKey.X_API_KEY]: String(HeaderValues.X_API_KEY),
  [HeaderKey.CONTENT_TYPE]: String(HeaderValues.CONTENT_TYPE),
};

export class CandidateHelper {
  static deleteCandidate(candidateId: number) {
    const payload: IDeleteRequest = {
      ids: [candidateId],
    };

    return cy.deleteCandidate(URLs.CANDIDATE_URL, payload, headers);
  }

  static getCandidate(candidateId: number) {
    const requestParams: IGetCandidateRequest = {
      limit: 50,
      offset: 0,
      candidateId: candidateId,
      model: GET_INFO.LIST_MODEL,
      sortField: GET_INFO.SORT_BY_DATE_OF_APPLICATION,
      sortOrder: GET_INFO.DESC,
    };

    return cy.getCandidate(URLs.CANDIDATE_URL, requestParams, headers);
  }
}
