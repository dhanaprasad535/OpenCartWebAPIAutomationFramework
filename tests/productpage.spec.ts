import { test, expect } from "../src/fixtures/pagefixtures.js";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
});

test("@smoke verify product header", async ({
  homePage,
  searchResultsPage,
  productInfoPage,
}) => {
  await homePage.doSearch("macbook");
  await searchResultsPage.selectProduct("MacBook Pro");
  expect(await productInfoPage.getProductHeader()).toBe("MacBook Pro");
});

test("@regression verify product image count", async ({
  homePage,
  searchResultsPage,
  productInfoPage,
}) => {
  await homePage.doSearch("macbook");
  await searchResultsPage.selectProduct("MacBook Pro");
  expect(await productInfoPage.getProductImagesCount()).toBe(4);
});

test("@regression verify product info", async ({
  homePage,
  searchResultsPage,
  productInfoPage,
}) => {
  await homePage.doSearch("macbook");
  await searchResultsPage.selectProduct("MacBook Pro");
  let productInfo = await productInfoPage.getProductInfo();
  console.log("product info", productInfo);
  expect.soft(productInfo.get("productHeader")).toBe("MacBook Pro");
  expect.soft(productInfo.get("productImagesCount")).toBe(4);
  expect.soft(productInfo.get("Brand")).toBe("Apple");
  expect.soft(productInfo.get("Product Code")).toBe("Product 18");
  expect.soft(productInfo.get("Reward Points")).toBe("800");
  expect.soft(productInfo.get("Availability")).toBe("Out Of Stock");
});

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
