import {
  APPLICATION_STATUS,
  VACANCIES,
} from "../../support/enums/job-vanacy-enum";
import { APP_MODULE } from "../../support/enums/modules-enums";
import { USER_INFO } from "../../support/enums/users-enum";
import { recruitmentHelper } from "../../support/helpers/recruitment-helper";
import { recruitmentPage } from "../../support/pages/recruitment-page";

describe("Validate Candidates", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });
    recruitmentHelper.prepareVacancy();
  });

  afterEach(() => {
    recruitmentHelper.cleanupEntities();
  });

  it("TC51: Candidates Page: Add, Search, Shortlist & Interview", () => {
    cy.openFromMenu(APP_MODULE.RECRUITMENT);
    cy.validateHeader(APP_MODULE.RECRUITMENT);

    cy.fixture("candidate-info").as("candidate");
    cy.get("@candidate").then((candidate: any) => {
      
      cy.fixture("job").as("job");
      return cy.get("@job").then((job: any) => {
        recruitmentPage.visitCandidatePage();
        recruitmentPage.addButton();
        recruitmentPage.enterFirstName(candidate.valid.firstName);
        recruitmentPage.enterMiddleName(candidate.valid.middleName);
        recruitmentPage.enterLastName(candidate.valid.lastName);

        recruitmentPage.selectVacancy(VACANCIES.NAME);

        recruitmentPage.enterEmail(candidate.valid.email);
        recruitmentPage.enterContactNumber(candidate.valid.contactNumber);
        recruitmentPage.uploadResume();
        recruitmentPage.enterKeywords(candidate.valid.keywords);
        recruitmentPage.enterNote(candidate.valid.note);
        recruitmentPage.saveButton();

        recruitmentPage.visitCandidatePage();

        const candidateName = `${candidate.valid.firstName}`;

        recruitmentPage.searchCandidateName(candidateName);
        recruitmentPage.searchButton();
        recruitmentPage.validateCandidateRow(
          VACANCIES.NAME,
          candidateName,
          `${USER_INFO.FIRST_NAME}  ${USER_INFO.LAST_NAME}`,
          APPLICATION_STATUS.INITIATED
        );
        recruitmentPage.shortlisted();
        recruitmentPage.saveButton();

        recruitmentPage.visitCandidatePage();

        recruitmentPage.searchCandidateName(candidateName);
        recruitmentPage.searchButton();
        recruitmentPage.validateCandidateRow(
          VACANCIES.NAME,
          candidateName,
          `${USER_INFO.FIRST_NAME}  ${USER_INFO.LAST_NAME}`,
          APPLICATION_STATUS.SHORTLISTED
        );

        recruitmentPage.scheduleInterview();

        recruitmentPage.enterInterviewTitle(job.interview.title);
        recruitmentPage.enterInterviewerName(USER_INFO.EMPLOYEE_NAME);
        recruitmentPage.enterData(job.interview.date);
        recruitmentPage.enterTime(job.interview.time);
        recruitmentPage.saveButton();
        recruitmentPage.visitCandidatePage();
        recruitmentPage.searchCandidateName(candidateName);
        recruitmentPage.searchButton();
        recruitmentPage.validateCandidateRow(
          VACANCIES.NAME,
          candidateName,
          `${USER_INFO.FIRST_NAME}  ${USER_INFO.LAST_NAME}`,
          APPLICATION_STATUS.INTERVIEW_SCHEDULED
        );
        recruitmentPage.passInterview();
        recruitmentPage.saveButton();
        recruitmentPage.visitCandidatePage();
        recruitmentPage.searchCandidateName(candidateName);
        recruitmentPage.searchButton();
        recruitmentPage.validateCandidate(
          VACANCIES.NAME,
          candidateName,
          `${USER_INFO.FIRST_NAME}  ${USER_INFO.LAST_NAME}`,
          APPLICATION_STATUS.INTERVIEW_PASSED
        );
      });
    });
  });
});
