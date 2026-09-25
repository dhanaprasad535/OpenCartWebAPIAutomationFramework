import { test as baseTest, expect } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage.js";
import { HomePage } from "../pages/HomePage.js";
import { BasePage } from "../pages/BasePage.js";
import { SearchResultsPage } from "../pages/SearchResultsPage.js";
import { ProductInfoPage } from "../pages/ProductInfoPage.js";

type pageFixtures = {
  basePage: BasePage;
  loginPage: LoginPage;
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  productInfoPage: ProductInfoPage;
};

const test = baseTest.extend<pageFixtures>({
  basePage: async ({ page }, use) => {
    let basePage = new BasePage(page);
    await use(basePage);
  },
  loginPage: async ({ page }, use) => {
    let loginPage = new LoginPage(page);
    await use(loginPage);
  },
  homePage: async ({ page }, use) => {
    let homePage = new HomePage(page);
    await use(homePage);
  },
  searchResultsPage: async ({ page }, use) => {
    let searchResultsPage = new SearchResultsPage(page);
    await use(searchResultsPage);
  },
  productInfoPage: async ({ page }, use) => {
    let productInfoPage = new ProductInfoPage(page);
    await use(productInfoPage);
  },
});

export { test, expect };
