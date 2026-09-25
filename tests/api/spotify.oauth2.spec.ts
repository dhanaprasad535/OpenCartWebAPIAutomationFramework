import { test, expect } from "../../src/fixtures/apifixtures.js";

let OAUTH_CONFIG = {
  tokenUrl: "https://accounts.spotify.com/api/token",
  clientId: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  grantType: process.env.GRANT_TYPE,
};

let access_token: string;
test.beforeAll("generate access token", async ({ request }) => {
  let response = await request.post(OAUTH_CONFIG.tokenUrl, {
    form: {
      client_id: OAUTH_CONFIG.clientId!,
      client_secret: OAUTH_CONFIG.clientSecret!,
      grant_type: OAUTH_CONFIG.grantType!,
    },
  });
  expect(response.status()).toBe(200);

  let responseJson = await response.json();
  console.log("access_token", responseJson.access_token);
  access_token = responseJson.access_token;
});

test("get album data", async ({ request }) => {
  let albumResponse = await request.get(
    "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
  console.log("Status:", albumResponse.status());
  console.log("Body:", await albumResponse.text());

  expect(albumResponse.ok()).toBeTruthy();
  let responseJson = await albumResponse.json();
  console.log(responseJson.album_type);
  console.log(responseJson.external_urls.spotify);
  console.log(responseJson.images.length);
});
