import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class HomePage extends BasePage {
  // locators
  private readonly logoutLink: Locator;
  private readonly headers: Locator;
  private readonly searchBox: Locator;
  private readonly searchIcon: Locator;

  //   private readonly searchBox: Locator;
  constructor(page: Page) {
    super(page);
    this.logoutLink = page.getByRole("link", { name: "Logout" });
    this.headers = page.getByRole("heading", { level: 2 });
    this.searchBox = page.getByRole("textbox", { name: "Search" });
    this.searchIcon = page.locator("#search button");
  }

  async getHomePageTitle(): Promise<String> {
    let title = await this.page.title();
    return title;
  }

  async isLogoutLinkExists(): Promise<boolean> {
    await this.logoutLink.waitFor({ state: "visible" });
    return true;
  }

  async getHomePageHeaders(): Promise<string[]> {
    return await this.headers.allInnerTexts();
  }

  async doSearch(searchKey: string): Promise<void> {
    console.log(`search key: ${searchKey}`);
    await this.searchBox.fill(searchKey);
    await this.searchIcon.click();
  }
}
