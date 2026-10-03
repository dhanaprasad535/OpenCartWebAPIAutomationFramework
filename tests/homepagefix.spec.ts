import { test, expect } from "../src/fixtures/pagefixtures.js";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
});

test("@smoke home page title test", async ({ homePage }) => {
  let homePageTitle = await homePage.getHomePageTitle();
  console.log("home page title", homePageTitle);
  expect(homePageTitle).toBe("My Account");
});

test("@regression logout link exists", async ({ homePage }) => {
  expect(await homePage.isLogoutLinkExists()).toBeTruthy();
});

test("@regression home page headers exist test", async ({ homePage }) => {
  let allHeaders: string[] = await homePage.getHomePageHeaders();
  console.log("all headers", allHeaders);
  expect.soft(allHeaders).toHaveLength(4);
  expect
    .soft(allHeaders)
    .toEqual(["My Account", "My Orders", "My Affiliate Account", "Newsletter"]); // order is mandatory
});

// common features test
test("@smoke app logo exists on login page", async ({ basePage }) => {
  expect(await basePage.isLogoVisible()).toBeTruthy();
});

test("@smoke search box exists on login page", async ({ basePage }) => {
  expect(await basePage.isSearchBoxVisible()).toBeTruthy();
});

test("@regression cart button exists on login page", async ({ basePage }) => {
  expect(await basePage.isCartButtonVisible()).toBeTruthy();
});

test("@regression verify footers on login page", async ({ basePage }) => {
  let footerLinks: string[] = await basePage.getPageFooters();
  for (let footerLink of footerLinks) {
    console.log("footer link", footerLink);
  }
});
