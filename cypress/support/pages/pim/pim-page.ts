import "cypress-file-upload";

const LOCATORS = {
  ADD_EMPLOYEE: ".oxd-topbar-body-nav-tab",
  FIRSTNAME: 'input[name="firstName"]',
  MIDDLENAME: 'input[name="middleName"]',
  LASTNAME: 'input[name="lastName"]',
  EMPLOYEE_ID: 'input[class="oxd-input oxd-input--active"]',
  SAVE_BTN: 'button[type="submit"]',
  CHECKBOX: "input[type='checkbox']",
  UPLOAD_PIC_BTN: ".employee-image-action",
  UPLOAD_FILE: 'input[type="file"]',
  USERNAME: "input[autocomplete='off']",
  PASSWORD: "input[type='password']",
  TABLE_COL: 'div[role="row"]',
  PROFILE_PIC: "img[class='employee-image']",
  EMPLOYEE_LIST: ".oxd-topbar-body-nav-tab-item",
};

class PimPage {

  openAddEmployee() {
    cy.contains(LOCATORS.ADD_EMPLOYEE, "Add Employee")
      .should("be.visible")
      .click();
  }

  typeFirstName(firstname: string) {
    cy.get(LOCATORS.FIRSTNAME).should("be.visible").clear().type(firstname);
  }

  typeMiddleName(middlename: string) {
    cy.get(LOCATORS.MIDDLENAME).clear().type(middlename);
  }

  typeLastName(lastname: string) {
    cy.get(LOCATORS.LASTNAME).clear().type(lastname);
  }

  typeEmployeeId(employeerId: number) {
    cy.get(LOCATORS.EMPLOYEE_ID).last().clear().type(employeerId.toString());
  }

  save() {
    cy.get(LOCATORS.SAVE_BTN).click();
  }

  clickCreateLoginDetailsBtn() {
    cy.get(LOCATORS.CHECKBOX).check({ force: true });
  }

  uploadPic() {
    cy.get(LOCATORS.UPLOAD_PIC_BTN).click();
    cy.fixture("user_photo.png", null).as("user_photo");
    cy.get(LOCATORS.UPLOAD_FILE).selectFile("@user_photo", { force: true });
  }

  typeUserName(username: string) {
    cy.get(LOCATORS.USERNAME).first().clear().type(username);
  }

  typePassword(password: string) {
    cy.get(LOCATORS.PASSWORD).first().clear().type(password);
    cy.get(LOCATORS.PASSWORD).last().clear().type(password);
  }

  openEmployeeList() {
    cy.contains(LOCATORS.EMPLOYEE_LIST, "Employee List", {
      timeout: 10000,
    }).click();
  }

  validateMsg() {
    cy.fixture("messeges").as("messeges");
    cy.get("@messeges").then((messeges: any) => {
      cy.contains(messeges.successfullyMsg);
    });
  }

  validateEmployeeImage() {
    cy.get(LOCATORS.PROFILE_PIC)
      .should("be.visible")
      .and(($img) => {
        const img = $img[0] as HTMLImageElement;
        expect(img.naturalWidth).to.be.greaterThan(0);
        expect(img.naturalHeight).to.be.greaterThan(0);
      });
  }

  checkRequiredMsg() {
    cy.fixture("messeges").as("messeges");
    cy.get("@messeges").then((messeges: any) => {
      cy.contains(messeges.required);
    });
  }

  uplaodInvalidPic() {
    cy.get(LOCATORS.UPLOAD_PIC_BTN).click();
    cy.fixture("wrong_photo.exe", null).as("wrong_photo");
    cy.get(LOCATORS.UPLOAD_FILE).selectFile("@wrong_photo", { force: true });

    cy.fixture("messeges").as("messeges");
    cy.get("@messeges").then((messeges: any) => {
      cy.contains(messeges.invalidPicMsg);
    });
  }

  typeShortPassword() {
    cy.fixture("employeers").as("employeers");
    cy.get("@employeers").then((employeers: any) => {
      cy.get(LOCATORS.PASSWORD).first().clear().type(employeers.shortPassword);
      cy.get(LOCATORS.PASSWORD).last().clear().type(employeers.shortPassword);
    });

    cy.fixture("messeges").as("messeges");
    cy.get("@messeges").then((messeges: any) => {
      cy.contains(messeges.shortPasswordMsg);
    });
  }
}

export const pimPage = new PimPage();
