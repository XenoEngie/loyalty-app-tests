import { test, expect, Page } from "@playwright/test";
import { beforeEach, describe } from "node:test";
import { RegistrationPage } from "../pages/registration/RegistrationPage";
import { registrationFields } from "../pages/registration/RegistrationPageInterfaces";
import {
  generateBigTextWithWords,
  generateRandomCardCvv,
  generateRandomCardDueDate,
  generateRandomCardNumber,
  generateRandomEmail,
  generateRandomPassword,
} from "../helper/randomDataGenerator";

describe("Sign up page tests", async () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
  });

  test("Ensure that the option to sign up for a free trial is visible", async () => {
    await registrationPage.navigateTo();

    await expect(registrationPage.elements.signUpFreeTrial).toBeVisible();
  });

  test("Ensure that a user can create an account by providing a valid email address, password", async () => {
    const userPassword: string = generateRandomPassword(10);

    const userData: registrationFields = {
      email: generateRandomEmail(),
      password: userPassword,
      confirmPassword: userPassword,
      brandInfo: generateBigTextWithWords(5),
      cardInfo: {
        number: generateRandomCardNumber(),
        dueDate: generateRandomCardDueDate(),
        cvv: generateRandomCardCvv(),
      },
    };

    await registrationPage.navigateTo();
    await registrationPage.registerUser(userData);

    await expect(registrationPage.elements.successLoginMessage).toBeVisible();
  });

  test("Verify the processing of an incorrect email address format.", async () => {
    const incorrectEmailCredentials: string = generateRandomPassword(1);
    const userPassword: string = generateRandomPassword(10);

    const userData: registrationFields = {
      email: incorrectEmailCredentials,
      password: userPassword,
      confirmPassword: userPassword,
      brandInfo: generateBigTextWithWords(10),
    };

    await registrationPage.navigateTo();
    await registrationPage.registerUser(userData);

    await expect(registrationPage.elements.wrongEmailMessage).toBeVisible();
    await expect(registrationPage.elements.signUpBtn).toBeDisabled();
  });

  test("Verify the processing of a short password during registration.", async () => {
    const incorrectUserPassword: string = generateRandomPassword(2);

    const userData: registrationFields = {
      email: generateRandomEmail(),
      password: incorrectUserPassword,
      confirmPassword: incorrectUserPassword,
      brandInfo: generateBigTextWithWords(10),
    };

    await registrationPage.navigateTo();
    await registrationPage.registerUser(userData);

    await expect(registrationPage.elements.wrongPasswordMessage).toBeVisible();
    await expect(registrationPage.elements.signUpBtn).toBeDisabled();
  });

  test("Verify the possibility of registering by skipping some fields and see if the system displays the corresponding errors.", async () => {
    const userData: registrationFields = {
      email: "",
      password: "",
      confirmPassword: "",
      brandInfo: "",
    };

    await registrationPage.navigateTo();
    await registrationPage.registerUser(userData);

    await expect(registrationPage.elements.wrongEmailMessage).toBeVisible();
    await expect(registrationPage.elements.wrongPasswordMessage).toBeVisible();
    await expect(registrationPage.elements.signUpBtn).toBeDisabled();
  });
});
