import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class LoginPage extends BasePage {
  // private locators
  private readonly emailId: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;
  private readonly forgottenPasswordLink: Locator;
  private readonly loginErrorMsg: Locator;

  // Constructor of the page class: init the locators
  constructor(page: Page) {
    super(page);
    this.emailId = page.getByRole("textbox", { name: "E-Mail Address" });
    this.password = page.getByLabel("Password");
    this.loginBtn = page.getByRole("button", { name: "Login" });
    this.forgottenPasswordLink = page
      .getByRole("link", { name: "Forgotten Password" })
      .first();
    this.loginErrorMsg = page.locator(".alert.alert-danger.alert-dismissible");
  }

  // public methods
  async goToLoginPage(): Promise<void> {
    await this.page.goto("opencart/index.php?route=account/login");
  }

  async getLoginPageTitle(): Promise<String> {
    let title = await this.page.title();
    return title;
  }

  async isForgottenPasswordLinkExists(): Promise<boolean> {
    return await this.forgottenPasswordLink.isVisible();
  }

  async doLogin(username: string, password: string): Promise<void> {
    console.log(`user creds ${username} - ${password}`);
    await this.emailId.fill(username);
    await this.password.fill(password);
    await Promise.all([
      this.page.waitForURL(/route=account\/login/),
      this.password.press("Enter"),
    ]);
  }

  async isInvalidLoginErrorMsgDisplayed(): Promise<boolean> {
    return await this.loginErrorMsg.isVisible();
  }
}
