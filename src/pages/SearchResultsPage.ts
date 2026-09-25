import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class SearchResultsPage extends BasePage {
  private readonly searchResults: Locator;
  constructor(page: Page) {
    super(page);
    this.searchResults = page.locator("div.product-layout");
  }

  async getProductSearchResultsCount(): Promise<number> {
    return await this.searchResults.count();
  }

  async selectProduct(productName: string): Promise<void> {
    console.log("productName ", productName);
    //dynamic locator - gets created on the fly
    // must be created inside the method and not in the constructor
    await this.page
      .getByRole("link", { name: productName, exact: true })
      .first()
      .click();
  }
}
