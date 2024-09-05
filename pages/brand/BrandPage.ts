import { Page } from "@playwright/test";
import { brandPageValues } from "./BrandPageVariables";
import { cardInfoFields, storeFields } from "./BrandPageInterfaces";

export class BrandPage {
  readonly brandPage;
  readonly elements;

  constructor(page: Page) {
    this.brandPage = page;
    this.elements = brandPageValues(page);
  }

  async navigateTo() {
    await this.brandPage.visit("/brand");
  }

  async fillCardInfo(values: cardInfoFields) {
    await this.elements.emailField.fill(values.number);
    await this.elements.passwordField.fill(values.dueDate);
    await this.elements.confirmPasswordField.fill(values.cvv);
  }

  async addStore(values: storeFields) {
    await this.elements.name.fill(values.name);
    await this.elements.address.fill(values.address);
    await this.elements.phoneNumber.fill(values.phoneNumber);
    await this.elements.emailStore.fill(values.emailStore);
    await this.elements.addBtn.click();
  }
}
