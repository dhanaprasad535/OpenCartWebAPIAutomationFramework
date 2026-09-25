import type { Locator, Page } from "@playwright/test";

export class BasePage {
  protected readonly page: Page;
  protected readonly logo: Locator;
  protected readonly searchBox: Locator;
  protected readonly searchIcon: Locator;
  protected readonly footerLinks: Locator;
  protected readonly currency: Locator;
  protected readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole("img", { name: "naveenopencart" });
    this.searchBox = page.getByRole("textbox", { name: "Search" });
    this.searchIcon = page.locator("div#search button");
    this.cartButton = page.locator("div#cart button");
    this.footerLinks = page.locator("footer a");
    this.currency = page.getByText("Currency");
  }

  async isLogoVisible(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  async isSearchBoxVisible(): Promise<boolean> {
    return await this.searchBox.isVisible();
  }

  async isCurrnecyVisible(): Promise<boolean> {
    return await this.currency.isVisible();
  }

  async isCartButtonVisible(): Promise<boolean> {
    return await this.cartButton.isVisible();
  }

  async getPageFootersCount(): Promise<number> {
    return await this.footerLinks.count();
  }

  async getPageFooters(): Promise<string[]> {
    return await this.footerLinks.allInnerTexts();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  getPageCurrentUrl() {
    return this.page.url();
  }

  async waitForPageLoad() {
    this.page.waitForLoadState("load");
  }

  async takeScreenshot(name: string) {
    this.page.screenshot({
      fullPage: true,
      path: `reports/screenshots/${name}`,
    });
  }
}
