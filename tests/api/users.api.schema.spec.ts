import { test, expect } from "../../src/fixtures/apifixtures.js";
import Ajv from "ajv";
import fs from "fs";

const ajv = new Ajv();

const AUTH_HEADER = {
  Authorization: `Bearer ${process.env.API_TOKEN}`,
};

// let userArraySchema = {
//   type: "array",
//   items: userSchema,
// };

test("@regression get a user - schema test", async ({ apiHelper }) => {
  let payload = {
    name: "Rakesh Naik KK",
    email: `RakeshKK${Date.now()}@gmail.com`,
    gender: "male",
    status: "active",
  };
  let response = await apiHelper.post("/public/v2/users", payload, AUTH_HEADER);
  let userId = response.body.id;
  expect(response.status).toBe(201);

  let getResponse = await apiHelper.get(
    `/public/v2/users/${userId}`,
    AUTH_HEADER,
  );
  expect(getResponse.status).toBe(200);

  //   let validate = ajv.compile(userSchema);
  /// readFileSync points to D:\OpenCart_Web_API by default
  let validate = ajv.compile(
    JSON.parse(fs.readFileSync("./src/schema/userSchema.json", "utf-8")),
  );
  let isSchemaValid = validate(getResponse.body);
  if (!isSchemaValid) {
    console.log("SCHEMA ERRORS: ", validate.errors);
  }

  expect(isSchemaValid).toBeTruthy();
});

// test("get all users - schema test", async ({ apiHelper }) => {
//   let getResponse = await apiHelper.get("/public/v2/users", AUTH_HEADER);
//   expect(getResponse.status).toBe(200);
//   let validate = ajv.compile(userArraySchema);
//   let isSchemValid = validate(getResponse.body);
//   if (!isSchemValid) {
//     console.log("SCHEMA ERRROS: ", validate.errors);
//   }
//   expect(isSchemValid).toBeTruthy();
// });
