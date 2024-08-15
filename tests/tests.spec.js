const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const {
  email,
  password,
  incorrectEmail,
  incorrectPassport,
} = require("../user.js");

test("test", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(password);
  await expect(page).toHaveURL("https://netology.ru/profile");
  await expect(page.locator("h2")).toContainText(["Мое обучение"]);
});
