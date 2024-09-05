import { Page } from "@playwright/test";

export function brandPageValues(page: Page) {
  return {
    trialPeriodFeatures: {
      feature1: page.locator('[data-test="feature-1"]'),
      feature2: page.locator('[data-test="feature-2"]'),
      feature3: page.locator('[data-test="feature-3"]'),
      feature4: page.locator('[data-test="feature-4"]'),
    },

    cardNumber: page.locator('[data-test="card-number"]'),
    cardDueDate: page.locator('[data-test="card-due-date"]'),
    cardCvv: page.locator('[data-test="card-cvv"]'),
    subscribeBtn: page.locator('[data-test="subscribe"]'),

    successMsg: page.locator('[data-test="successMessage"]'),

    storeValues: {
      name: page.locator('[data-test="store-name"]'),
      address: page.locator('[data-test="store-address"]'),
      phoneNumber: page.locator('[data-test="store-phone-number"]'),
      emailStore: page.locator('[data-test="store-email"]'),
      addBtn: page.getByRole("button", { name: "Add" }),
    },
  };
}
