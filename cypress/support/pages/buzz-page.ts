import { BUZZ_KEY } from "../enums/buzz-enum";
import { LEAVE_KEY } from "../enums/leave-enum";
import { USER_INFO } from "../enums/users-enum";

const URLs = {
  LOGIN_URL: "/auth/login",
};
const LOCATORS = {
  POST_AREA: 'textarea[placeholder="What\'s on your mind?"]',
  POST_BTN: "button[type='submit']",
  POST_CONTAINER:
    ".oxd-sheet.oxd-sheet--rounded.oxd-sheet--white.orangehrm-buzz",
  POST_CELL: ".orangehrm-buzz-post-body-text",
  LOG_OUT_BTN: ".oxd-userdropdown-tab",
};

class BuzzPage {
  private postContent: string = "";

  enterPostContent() {
    cy.fixture("postInfo").as("postInfo");
    cy.get("@postInfo").then((postInfo: any) => {
      const randomStr = Math.random().toString(36).substring(2, 8);
      this.postContent = `${postInfo.post}${randomStr}`;
      cy.get(LOCATORS.POST_AREA).type(this.postContent);
    });
  }

  clickPost() {
    cy.contains(LOCATORS.POST_BTN, BUZZ_KEY.POST).click();
  }

  verifyPost() {
    cy.get(LOCATORS.POST_CONTAINER)
      .first()
      .find(LOCATORS.POST_CELL)
      .should("contain.text", this.postContent);
  }

  verifyMsg() {
    cy.fixture("messeges").as("messeges");
    cy.get("@messeges").then((messeges: any) => {
      cy.contains(messeges.successfullyMsg);
    });
  }

  loginAsEmployee() {
    cy.login(USER_INFO.USERNAME, USER_INFO.PASSWORD);
  }

  logout() {
    cy.get(LOCATORS.LOG_OUT_BTN).click();
    cy.contains(BUZZ_KEY.LOGOUT).click();

    cy.url().should("include", URLs.LOGIN_URL);
  }

  loginAsAdmin() {
    cy.fixture("users").as("users");
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });
  }
}

export const buzzPage = new BuzzPage();
