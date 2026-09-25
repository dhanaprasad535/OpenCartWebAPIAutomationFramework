import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class ProductInfoPage extends BasePage {
  private readonly header: Locator;
  private readonly productImages: Locator;
  private readonly productMetadata: Locator;
  private readonly productPricingData: Locator;
  private readonly productInfoMap: Map<string, string | number>;

  constructor(page: Page) {
    super(page);
    this.header = page.getByRole("heading", { level: 1 });
    this.productImages = page.locator("div#content li img");
    this.productMetadata = page.locator(
      "#content ul.list-unstyled:nth-of-type(1) li",
    );
    this.productPricingData = page.locator(
      "#content ul.list-unstyled:nth-of-type(2) li",
    );
    this.productInfoMap = new Map<string, string | number>();
  }

  async getProductHeader(): Promise<string> {
    return await this.header.innerText();
  }

  async getProductImagesCount(): Promise<number> {
    await this.productImages.first().waitFor({ state: "visible" });
    return await this.productImages.count();
  }

  async getProductInfo(): Promise<Map<string, string | number>> {
    this.productInfoMap.set("productHeader", await this.getProductHeader());
    this.productInfoMap.set(
      "productImagesCount",
      await this.getProductImagesCount(),
    );
    await this.getProductMetadataInfo();
    await this.getProductPricingdata();
    return this.productInfoMap;
  }

  async getProductMetadataInfo(): Promise<void> {
    let metdataInfo: string[] = await this.productMetadata.allInnerTexts();
    for (let data of metdataInfo) {
      let meta = data.split(":");
      let metaKey = meta[0]!.trim(); // ! gurantees the value is not undefined
      let metaValue = meta[1]!.trim();
      this.productInfoMap.set(metaKey, metaValue);
    }
  }

  async getProductPricingdata(): Promise<void> {
    let priceData = await this.productPricingData.allInnerTexts();
    let price = priceData[0]?.trim();
    let extraPrice = priceData[1]?.split(":")[1]?.trim(); // optional chaining?: if priceData[1] exists call split()
    this.productInfoMap.set("productPrice", price!);
    this.productInfoMap.set("extraPrice", extraPrice!);
  }
}
