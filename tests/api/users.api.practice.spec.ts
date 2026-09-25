import { test, expect, request, APIResponse } from "@playwright/test";

let AUTH_TOKEN = {
  Authorization:
    "Bearer 7499021ebab0ef15c8e7d34fe8f82a163980e63daaa6d043eb0d41f2b4e6da99",
};

let userid: number;
test("get all users api test", async ({ request }) => {
  let response: APIResponse = await request.get(
    "https://gorest.co.in/public/v2/users",
    {
      headers: AUTH_TOKEN,
    },
  );

  let responseJson = await response.json();
  console.log(responseJson);
  console.log(response.status());
  console.log(response.statusText());

  expect(response.status()).toBe(200);
});

test("create a user POST api test", async ({ request }) => {
  let payload = {
    name: "Rakesh K",
    email: `RakeshK_${Date.now()}@gmail.com`,
    gender: "male",
    status: "active",
  };

  let response: APIResponse = await request.post(
    "https://gorest.co.in/public/v2/users",
    {
      headers: AUTH_TOKEN,
      data: payload,
    },
  );

  let responseJson = await response.json();
  userid = responseJson.id;
  console.log("user id ", userid);
  console.log(responseJson);
  console.log(response.status());
  console.log(response.statusText());

  expect(response.status()).toBe(201);
});

test("update a user PUT api test", async ({ request }) => {
  let payload = {
    name: "Rakesh KK",
    email: "RakeshK@gmail.com",
    gender: "male",
    status: "active",
  };

  let response: APIResponse = await request.put(
    `https://gorest.co.in/public/v2/users/${userid}`,
    {
      headers: AUTH_TOKEN,
      data: payload,
    },
  );

  let responseJson = await response.json();
  userid = responseJson.id;
  console.log("user id ", userid);
  console.log(responseJson);
  console.log(response.status());
  console.log(response.statusText());

  expect(response.status()).toBe(200);
});

test("delete a user DELETE api test", async ({ request }) => {
  let response: APIResponse = await request.delete(
    `https://gorest.co.in/public/v2/users/${userid}`,
    {
      headers: AUTH_TOKEN,
    },
  );

  console.log(response.status());
  console.log(response.statusText());

  expect(response.status()).toBe(204);
});
