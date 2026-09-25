import { test, expect } from "../../src/fixtures/apifixtures.js";

const AUTH_HEADER = {
  Authorization: `Bearer ${process.env.API_TOKEN}`,
};

let userid: number;

test.describe.serial("running e2e go rest tests", () => {
  test("get all users api", async ({ apiHelper }) => {
    let response = await apiHelper.get("/public/v2/users", AUTH_HEADER);
    console.log("status", response.status);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("post - create a user api", async ({ apiHelper }) => {
    let payload = {
      name: "Rakesh Naik KK",
      email: `RakeshKK${Date.now()}@gmail.com`,
      gender: "male",
      status: "active",
    };
    let response = await apiHelper.post(
      "/public/v2/users",
      payload,
      AUTH_HEADER,
    );
    userid = response.body.id;
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(payload.name);
  });

  test("put - update a user api", async ({ apiHelper }) => {
    let payload = {
      name: "Rakesh Naik KK updated name",
      email: `RakeshKK${Date.now()}@gmail.com`,
      gender: "male",
      status: "inactive",
    };
    let response = await apiHelper.put(
      `/public/v2/users/${userid}`,
      payload,
      AUTH_HEADER,
    );

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(payload.name);
    expect(response.body.status).toBe(payload.status);
  });

  test("delete - delete a user api", async ({ apiHelper }) => {
    let response = await apiHelper.delete(
      `/public/v2/users/${userid}`,
      AUTH_HEADER,
    );

    console.log("status", response.status);
    expect(response.status).toBe(204);
  });
});
