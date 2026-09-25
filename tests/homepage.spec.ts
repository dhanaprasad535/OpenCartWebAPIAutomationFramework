import { test, expect } from "@playwright/test";
import { HomePage } from "../src/pages/HomePage.js";
import { LoginPage } from "../src/pages/LoginPage.js";

let homePage: HomePage;
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.doLogin("rkumar@gmail.com", "E8Eijc@@WqwfJ3t");
  homePage = new HomePage(page);
});

test.skip("", async () => {
  let homePageTitle = await homePage.getHomePageTitle();
  console.log("home page title", homePageTitle);
  expect(homePageTitle).toBe("My Account");
});

test.skip("logout link exists", async () => {
  expect(await homePage.isLogoutLinkExists()).toBeTruthy();
});

test.skip("home page headers exist test", async () => {
  let allHeaders: string[] = await homePage.getHomePageHeaders();
  console.log("all headers", allHeaders);
  expect.soft(allHeaders).toHaveLength(4);
  expect
    .soft(allHeaders)
    .toEqual(["My Account", "My Orders", "My Affiliate Account", "Newsletter"]); // order is mandatory
});
