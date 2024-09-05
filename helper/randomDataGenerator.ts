import { faker } from "@faker-js/faker";

export function generateRandomEmail(): string {
  return faker.internet.email();
}

export function generateRandomPassword(length: number = 12): string {
  return faker.internet.password(length, true);
}

export function generateRandomCardNumber(): string {
  return faker.finance.creditCardNumber();
}

export function generateRandomCardDueDate(): string {
  const month = faker.date.month({ context: true });
  const year = faker.date.future(1).getFullYear().toString().slice(-2);
  return `${month} ${year}`;
}

export function generateRandomCardCvv(): string {
  return faker.finance.creditCardCVV();
}

export function generateRandomNumber(length: number): string {
  let number = "";
  for (let i = 0; i < length; i++) {
    number += faker.datatype.number({ min: 0, max: 9 }).toString();
  }
  return number;
}

export function generateBigTextWithWords(wordCount: number): string {
  return faker.lorem.words(wordCount);
}

export function generateRandomAddress(): string {
  return faker.address.streetAddress();
}

export function generateRandomPhoneNumber(): string {
  return faker.phone.number();
}
