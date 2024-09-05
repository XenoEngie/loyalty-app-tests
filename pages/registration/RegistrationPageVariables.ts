import { Page } from "@playwright/test";

export function registrationPageValues(page: Page) {
  return {
    emailField: page.locator('[data-test="emailField"]'),
    passwordField: page.locator('[data-test="passwordField"]'),
    confirmPasswordField: page.locator('[data-test="passwordField-2"]'),

    brandInfo: page.locator('[data-test="card-brand"]'),

    signUpBtn: page.getByRole("button", { name: "Sign up" }),

    signUpFreeTrial: page.getByRole("button", { name: "Free trial" }),
    successLoginMessage: page.locator('[data-test="success-log"]'),

    wrongEmailMessage: page.locator('[data-test="wrong-email-message"]'),
    wrongPasswordMessage: page.locator('[data-test="wrong-password-message"]'),
    wrongBrandMessage: page.locator('[data-test="wrong-brand-message"]'),
  };
}
