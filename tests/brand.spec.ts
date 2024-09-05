import { test, expect, Locator } from "@playwright/test";
import { RegistrationPage } from "../pages/registration/RegistrationPage";
import {
  generateBigTextWithWords,
  generateRandomAddress,
  generateRandomCardCvv,
  generateRandomCardDueDate,
  generateRandomCardNumber,
  generateRandomEmail,
  generateRandomNumber,
  generateRandomPassword,
  generateRandomPhoneNumber,
} from "../helper/randomDataGenerator";
import { registrationFields } from "../pages/registration/RegistrationPageInterfaces";
import { BrandPage } from "../pages/brand/BrandPage";
import {
  cardInfoFields,
  storeFields,
} from "../pages/brand/BrandPageInterfaces";

test.describe("Brand page tests", () => {
  let registrationPage: RegistrationPage;
  let brandPage: BrandPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    brandPage = new BrandPage(page);

    const userPassword: string = generateRandomPassword(10);

    const userData: registrationFields = {
      email: generateRandomEmail(),
      password: userPassword,
      confirmPassword: userPassword,
      brandInfo: generateBigTextWithWords(5),
    };

    await registrationPage.navigateTo();
    await registrationPage.registerUser(userData);
  });

  test("Ensure that the features available during the trial period are displayed.", async () => {
    const trialPeriodFeatures: Locator[] =
      brandPage.elements.trialPeriodFeatures;

    await brandPage.navigateTo();

    trialPeriodFeatures.forEach((feature: Locator) => {
      expect(feature).toBeVisible();
    });
  });

  test("Make sure that the user can enter credit card details to pay for the subscription after the trial period expires.", async () => {
    const cardInfo: cardInfoFields = {
      number: generateRandomCardNumber(),
      dueDate: generateRandomCardDueDate(),
      cvv: generateRandomCardCvv(),
    };

    await brandPage.navigateTo();
    await brandPage.fillCardInfo(cardInfo);
    await brandPage.elements.subscribeBtn.click();

    await expect(brandPage.elements.successMsg).toBeVisible();
  });

  test("Make sure that the user can add the store filling all the values", async () => {
    const storeInfo: storeFields = {
      name: generateRandomNumber(2),
      address: generateRandomAddress(),
      phoneNumber: generateRandomPhoneNumber(),
      emailStore: generateRandomEmail(),
    };

    await brandPage.navigateTo();
    await brandPage.addStore(storeInfo);

    await expect(brandPage.elements.storeValues.name).toBeVisible();
  });
});
