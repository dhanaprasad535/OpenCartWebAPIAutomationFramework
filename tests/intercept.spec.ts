import { test, expect } from "@playwright/test";

// Intercept the network requests and log them
test("intercept and log the url", async ({ page }) => {
  await page.route("**/*.woff2", async (route) => {
    console.log(route.request().method(), route.request().url());
    await route.continue();
  });

  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/login",
  );
});

// Intercept with mocking
test("intercept and mock the json response", async ({ page }) => {
  await page.route("**/*", async (route) => {
    console.log(route.request().method(), route.request().url());
    await route.fulfill({
      status: 200,
      body: JSON.stringify({ name: "Dhana", age: 13 }),
    });
  });

  await page.goto("https://www.abc.com");
  await page.pause();
});

test("intercept and mock the html response", async ({ page }) => {
  await page.route("**/*", async (route) => {
    console.log(route.request().method(), route.request().url());
    await route.fulfill({
      status: 200,
      contentType: "text/html",
      body: `
        <html>
        <body>
          <h1>Welcome</h1>
          <button>Click Me</button>
        </body>
        </html>`,
    });
  });

  await page.goto("https://www.abc.com");
  await page.pause();
});
