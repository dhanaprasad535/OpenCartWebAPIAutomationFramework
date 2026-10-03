import { log, meta, testData } from "reporting-labs";
import { test, expect } from "../src/fixtures/pagefixtures.js";
import { CSVHelper } from "../src/utils/CSVHelper.js";
import { ExcelHelper } from "../src/utils/ExcelHelper.js";
import { JSONHelper } from "../src/utils/JSONHelper.js";
import * as allure from "allure-js-commons";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
});

test("@smoke login page title test", async ({ loginPage, basePage }) => {
  meta({
    severity: "critical",
    feature: "Authentication",
    story: "Login page title",
    priority: "P1",
    issue: "b/123456",
  });
  // let title = await loginPage.getLoginPageTitle();
  let title = await basePage.getPageTitle();
  console.log("title of login page ", title);
  await log("title of login page ", title);
  expect(title).toBe("Account Login");
});

test("@regression forgot password link exist test", async ({ loginPage }) => {
  meta({
    severity: "critical",
    feature: "f31",
    story: "Login page title2",
    priority: "P2",
    issue: "b/12479",
  });
  expect(await loginPage.isForgottenPasswordLinkExists()).toBeTruthy();
});

test("@regression user is able to login to the app with valid credentials", async ({
  loginPage,
  homePage,
}) => {
  await allure.suite("Login tests");
  await allure.severity("critical");
  await allure.feature("Authentication");
  await allure.story("Valid login");
  await allure.description("Verify user can login with valid credentials");

  await testData(
    {
      username: process.env.APP_USERNAME!,
      passwod: process.env.APP_PASSWORD!,
    },
    "login data",
  );
  await allure.step("Login with valid credentials", async () => {
    await loginPage.doLogin(
      process.env.APP_USERNAME!,
      process.env.APP_PASSWORD!,
    );
  });

  await allure.step("Verify loginout link is visible", async () => {
    expect.soft(await homePage.isLogoutLinkExists()).toBeTruthy();
  });

  await allure.step("Verify home page is title is My Account", async () => {
    expect.soft(await homePage.getHomePageTitle()).toBe("My Account");
  });
});

let testdata = CSVHelper.readCsv("src/testdata/logindata.csv");
for (let row of testdata) {
  test(`user is able to login to the app with invalid credentials with csv data - ${row.username} - ${row.password}`, async ({
    loginPage,
  }) => {
    await testData(testdata, "Invalid test data");
    await loginPage.doLogin(row.username!, row.password!);
    expect(await loginPage.isInvalidLoginErrorMsgDisplayed()).toBeTruthy();
  });
}

let testExcelData = ExcelHelper.readExcel(
  "src/testdata/logindata.csv",
  "Sheet1",
);
for (let row of testExcelData) {
  test(`user is able to login to the app with invalid credentials with excel data - ${row.username} - ${row.password}`, async ({
    loginPage,
  }) => {
    await loginPage.doLogin(row.username!, row.password!);
    expect(await loginPage.isInvalidLoginErrorMsgDisplayed()).toBeTruthy();
  });
}

let testJsonData = JSONHelper.readJson("src/testdata/logindata.json");
for (let row of testJsonData) {
  test(`@regression user is able to login to the app with invalid credentials with json data - ${row.username} - ${row.password}`, async ({
    loginPage,
  }) => {
    await loginPage.doLogin(row.username!, row.password!);
    expect(await loginPage.isInvalidLoginErrorMsgDisplayed()).toBeTruthy();
  });
}

// common features test
test("@smoke app logo exists on login page", async ({ basePage }) => {
  expect(await basePage.isLogoVisible()).toBeTruthy();
});

test("@smoke search box exists on login page", async ({ basePage }) => {
  expect(await basePage.isSearchBoxVisible()).toBeTruthy();
});

test("@smoke cart button exists on login page", async ({ basePage }) => {
  expect(await basePage.isCartButtonVisible()).toBeTruthy();
});

test("@smoke verify footers on login page", async ({ basePage }) => {
  let footerLinks: string[] = await basePage.getPageFooters();
  for (let footerLink of footerLinks) {
    console.log("footer link", footerLink);
  }
});
