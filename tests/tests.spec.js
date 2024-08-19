const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const {
  email,
  password,
  incorrectEmail,
  incorrectPassport,
  incorrectPassword,
} = require("../user.js");


test.only("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page).toHaveURL("https://netology.ru/profile/9055543");
  const expected = "Моё обучение";
  await expect(page.locator("h2")).toContainText(expected);
   await page.screenshot({ path: "screenshotSuccessful.png", fullPage: true });
}, 70000);

test.only("Unsuccessful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(incorrectEmail);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(incorrectPassword);
  await page.getByTestId("login-submit-btn").click();
  const actual = await page.locator('[data-testid="login-error-hint"]');
  const expected = "Вы ввели неправильно логин или пароль.";
  await expect(actual).toHaveText(expected);
  await page.screenshot({ path: "screenshotFailed.png", fullPage: true });
}, 60000);




