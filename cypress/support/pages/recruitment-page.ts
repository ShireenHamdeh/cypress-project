import { JOB_VANACY_KEY } from "../enums/job-vanacy-enum";
import { APP_MODULE } from "../enums/modules-enums";

const LOCATORS = {
  DROPDOWN: ".oxd-select-text--after",
  DROPDOWN_INPUT: ".oxd-select-text-input",
  DROPDOWN_OPTION: ".oxd-select-dropdown",
  UPLOAD_FILE: 'input[type="file"]',
  UPLOAD_FILE_BUTTON: ".oxd-file-button",
  FIRST_NAME: 'input[name="firstName"]',
  MIDDLE_NAME: 'input[name="middleName"]',
  LAST_NAME: 'input[name="lastName"]',
  LIST_ROW: '[role="row"]',
  CANDIDATE_NAME_INPUT: 'input[placeholder="Type for hints..."]',
  CANDIDATE_NAME_DROPDOWN: ".oxd-autocomplete-dropdown",
  EYE_BUTTON: ".oxd-icon.bi-eye-fill",
  INTERVIEWER_NAME_INPUT: 'input[placeholder="Type for hints..."]',
  INTERVIEWER_NAME_DROPDOWN: ".oxd-autocomplete-option",
  NOTE: 'textarea[placeholder="Type here"].oxd-textarea',
  DOWNLOAD_BUTTON: ".oxd-icon.bi-download",
  PLACE_HOLDER: 'input[placeholder="Type here"].oxd-input--active',
  PLACE_HOLDER_DESCRIPTION:
    'input[placeholder="Enter comma seperated words..."]',
  SUBMIT_BTN: 'button[type="submit"]',
  BTN: 'button[type="button"]',
  SEARCH_PLACEHOLDER:
    'input.oxd-input.oxd-input--active:not([readonly]):not([placeholder="Search"])',
  DATE_PLACEHOLDER: 'input[placeholder="yyyy-dd-mm"]',
  HOUR_PLACEHOLDER: 'input[placeholder="hh:mm"]',
};

class RecruitmentPage {
  visitCandidatePage() {
    cy.get(JOB_VANACY_KEY.A).contains(APP_MODULE.RECRUITMENT).click();
  }
  addButton() {
    cy.get(JOB_VANACY_KEY.BUTTON).contains(JOB_VANACY_KEY.ADD).click();
  }
  enterFirstName(firstName: string) {
    cy.get(LOCATORS.FIRST_NAME).type(firstName);
  }
  enterMiddleName(middleName: string) {
    cy.get(LOCATORS.MIDDLE_NAME).type(middleName);
  }
  enterLastName(lastName: string) {
    cy.get(LOCATORS.LAST_NAME).type(lastName);
  }
  selectVacancy(vacancyName: string) {
    cy.get(LOCATORS.DROPDOWN).first().click();
    cy.get(LOCATORS.DROPDOWN_OPTION).contains(vacancyName).click();
  }
  enterEmail(email: string) {
    cy.get(LOCATORS.PLACE_HOLDER).first().type(email);
  }
  enterContactNumber(contactNumber: string) {
    cy.get(LOCATORS.PLACE_HOLDER).last().type(contactNumber);
  }
  uploadResume() {
    cy.get(LOCATORS.UPLOAD_FILE_BUTTON).click();
    cy.fixture("resume.pdf", null).as("resume");
    cy.get(LOCATORS.UPLOAD_FILE).selectFile("@resume", { force: true });
  }

  enterKeywords(keywords: string) {
    cy.get(LOCATORS.PLACE_HOLDER_DESCRIPTION).type(keywords);
  }
  enterNote(note: string) {
    cy.get(LOCATORS.NOTE).last().type(note);
  }
  saveButton() {
    cy.get(LOCATORS.SUBMIT_BTN).contains(JOB_VANACY_KEY.SAVE).click();
  }
  searchCandidateName(name: string) {
    cy.get(LOCATORS.CANDIDATE_NAME_INPUT).type(name);
    cy.get(LOCATORS.CANDIDATE_NAME_DROPDOWN).contains(name).click();
  }
  searchButton() {
    cy.get(LOCATORS.SUBMIT_BTN).contains(JOB_VANACY_KEY.SEARCH).click();
  }
  validateCandidateRow(
    vacancy: string,
    name: string,
    hiringManager: string,
    status: string
  ) {
    cy.get(LOCATORS.LIST_ROW, { timeout: 10000 }) 
      .should("contain", name)
      .and("be.visible")
      .and("contain", vacancy)
      .and("contain", hiringManager)
      .and("contain", status)
      .find(LOCATORS.EYE_BUTTON)
      .click();
  }
  validateCandidate(
    vacancy: string,
    name: string,
    hiringManager: string,
    status: string
  ) {
    cy.get(LOCATORS.LIST_ROW)
      .should("contain", name)
      .and("be.visible")
      .and("contain", vacancy)
      .and("contain", hiringManager)
      .and("contain", status)
      .find(LOCATORS.DOWNLOAD_BUTTON);
  }
  shortlisted() {
    cy.get(LOCATORS.BTN).contains(JOB_VANACY_KEY.SHORTLIST).click();
    cy.get(LOCATORS.NOTE).type("Lets Go!");
  }
  scheduleInterview() {
    cy.get(LOCATORS.BTN).contains(JOB_VANACY_KEY.SCHEDULE_INTERVIEW).click();
  }
  enterInterviewTitle(title: string) {
    cy.get(LOCATORS.SEARCH_PLACEHOLDER).first().type(title);
  }
  enterInterviewerName(name: string) {
    cy.get(LOCATORS.INTERVIEWER_NAME_INPUT).type(name);
    cy.get(LOCATORS.INTERVIEWER_NAME_DROPDOWN).contains(name).click();
  }
  enterData(date: string) {
    cy.get(LOCATORS.DATE_PLACEHOLDER).clear().type(date);
  }
  enterTime(time: string) {
    cy.get(LOCATORS.HOUR_PLACEHOLDER).clear().type(time);
  }

  passInterview() {
    cy.get(LOCATORS.BTN).contains(JOB_VANACY_KEY.MARK_INTERVIEW_PASSED).click();
  }
}
export const recruitmentPage = new RecruitmentPage();
