// import { expect, test } from "@playwright/test";
import { test, expect } from "../src/fixtures/pagefixtures.js";
import { LoginPage } from "../src/pages/LoginPage.js";
import { HomePage } from "../src/pages/HomePage.js";

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  homePage = new HomePage(page);
});

test.skip("login page title test", async ({ loginPage }) => {
  let title = await loginPage.getLoginPageTitle();
  console.log("title of login page ", title);
  expect(title).toBe("Account Login");
});

test.skip("forgot password link exist test", async () => {
  expect(await loginPage.isForgottenPasswordLinkExists()).toBeTruthy();
});

test.skip("user is able to login to the app", async () => {
  await loginPage.doLogin("rkumar@gmail.com", "E8Eijc@@WqwfJ3t");
  expect.soft(await homePage.isLogoutLinkExists()).toBeTruthy();
  expect.soft(await homePage.getHomePageTitle()).toBe("My Account");
});
