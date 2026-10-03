import { test, expect } from "../../src/fixtures/apifixtures.js";

const AUTH_HEADER = {
  Authorization: `Bearer ${process.env.API_TOKEN}`,
};

// helper - generic function - create a user
async function createUser(apiHelper: any) {
  let payload = {
    name: "apiautomation",
    email: `apiautomation${Date.now()}@gmail.com`,
    gender: "male",
    status: "active",
  };
  let response = await apiHelper.post("/public/v2/users", payload, AUTH_HEADER);
  expect(response.status).toBe(201);
  return response.body;
}

test("@smoke create a user", async ({ apiHelper }) => {
  // create a user
  let userResponse = await createUser(apiHelper);

  // get a user
  let getResponse = await apiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(getResponse.status).toBe(200);
  expect(getResponse.body.name).toBe("apiautomation");
});

test("@smoke update a user", async ({ apiHelper }) => {
  // create a user
  let userResponse = await createUser(apiHelper);
  // get a user
  let getResponse = await apiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(getResponse.status).toBe(200);
  expect(getResponse.body.name).toBe("apiautomation");

  let updatePayload = {
    name: "apiautomation-updated",
    status: "inactive",
  };

  // update a user
  let updateResponse = await apiHelper.put(
    `/public/v2/users/${userResponse.id}`,
    updatePayload,
    AUTH_HEADER,
  );
  expect(updateResponse.status).toBe(200);
  expect.soft(updateResponse.body.name).toBe(updatePayload.name);
  expect.soft(updateResponse.body.status).toBe(updatePayload.status);

  getResponse = await apiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(getResponse.status).toBe(200);
  expect(getResponse.body.name).toBe(updatePayload.name);
  expect(getResponse.body.status).toBe(updatePayload.status);
});

test("@smoke delete a user", async ({ apiHelper }) => {
  // create a user
  let userResponse = await createUser(apiHelper);
  // get a user
  let getResponse = await apiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(getResponse.status).toBe(200);
  expect(getResponse.body.name).toBe("apiautomation");

  let deleteResponse = await apiHelper.delete(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(deleteResponse.status).toBe(204);

  getResponse = await apiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(getResponse.status).toBe(404);
  expect(getResponse.body.message).toBe("Resource not found");
});
