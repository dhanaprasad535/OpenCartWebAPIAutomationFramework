import { test, expect } from "../src/fixtures/pagefixtures.js";
import { SearchResultsPage } from "../src/pages/SearchResultsPage.js";
import { CSVHelper } from "../src/utils/CSVHelper.js";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.APP_USERNAME, process.env.APP_PASSWORD);
});

let testData = CSVHelper.readCsv("src/testdata/product.csv");
for (let row of testData) {
  test(`verify search results count ${row.searchkey} - ${row.productname}`, async ({
    homePage,
    searchResultsPage,
  }) => {
    await homePage.doSearch(row.searchkey!);
    let actualResultCount =
      await searchResultsPage.getProductSearchResultsCount();
    console.log("result count ", actualResultCount);
    expect(actualResultCount).toBe(Number(row.resultcount!));
  });
}

for (let row of testData) {
  test(`verify user is able to land on the product info page ${row.searchkey} - ${row.productname}`, async ({
    homePage,
    searchResultsPage,
    page,
  }) => {
    await homePage.doSearch(row.searchkey!);
    await searchResultsPage.selectProduct(row.productname!);
    expect(await page.title()).toBe(row.productname!);
  });
}

// common features test
test("app logo exists on login page", async ({ basePage }) => {
  expect(await basePage.isLogoVisible()).toBeTruthy();
});

test("search box exists on login page", async ({ basePage }) => {
  expect(await basePage.isSearchBoxVisible()).toBeTruthy();
});

test("cart button exists on login page", async ({ basePage }) => {
  expect(await basePage.isCartButtonVisible()).toBeTruthy();
});

test("verify footers on login page", async ({ basePage }) => {
  let footerLinks: string[] = await basePage.getPageFooters();
  for (let footerLink of footerLinks) {
    console.log("footer link", footerLink);
  }
});
