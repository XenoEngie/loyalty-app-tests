import { Page } from "@playwright/test";
import { registrationPageValues } from "./RegistrationPageVariables";
import { registrationFields } from "./RegistrationPageInterfaces";
import { BrandPage } from "../brand/BrandPage";

export class RegistrationPage extends BrandPage {
  readonly registrationPage;
  readonly elements;

  constructor(page: Page) {
    super(page);
    this.registrationPage = page;
    this.elements = registrationPageValues(page);
  }

  async navigateTo() {
    await this.registrationPage.visit("/registration");
  }

  async registerUser(values: registrationFields) {
    await this.elements.emailField.fill(values.email);
    await this.elements.passwordField.fill(values.password);
    await this.elements.confirmPasswordField.fill(values.password);
    await this.elements.brandInfo.fill(values.brandInfo);

    if (values.cardInfo) await this.fillCardInfo(values.cardInfo);

    await this.elements.signUpBtn.click();
  }
}
