import { test, expect } from "../../src/fixtures/apifixtures.js";

let tokenId: string;
test.beforeEach("get access token", async ({ request }) => {
  let payload = {
    username: "admin",
    password: "password123",
  };
  let response = await request.post(
    "https://restful-booker.herokuapp.com/auth",
    {
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    },
  );

  expect(response.status()).toBe(200);
  let responseJson = await response.json();
  console.log(responseJson);
  tokenId = responseJson.token;
});

test("booking CRUD with token", async ({ request }) => {
  let bookingData = {
    firstname: "Adi",
    lastname: "Samba",
    totalprice: 151,
    depositpaid: true,
    bookingdates: {
      checkin: "2023-01-01",
      checkout: "2023-01-03",
    },
    additionalneeds: "Breakfast",
  };
  let postResponse = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    {
      headers: {
        "Content-Type": "application/json",
      },
      data: bookingData,
    },
  );

  expect(postResponse.status()).toBe(200);
  let responseJson = await postResponse.json();
  console.log(responseJson);
  let id = responseJson.bookingid;
  expect(responseJson.booking.firstname).toBe(bookingData.firstname);

  let bookingUpdateData = {
    firstname: "AdiKumar",
    lastname: "Samba",
    totalprice: 151,
    depositpaid: true,
    bookingdates: {
      checkin: "2023-01-01",
      checkout: "2023-01-03",
    },
    additionalneeds: "Breakfast",
  };
  let updateResponse = await request.put(
    `https://restful-booker.herokuapp.com/booking/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${tokenId}`,
      },
      data: bookingUpdateData,
    },
  );

  expect(updateResponse.status()).toBe(200);
  let updateResponseJson = await updateResponse.json();
  console.log(updateResponseJson);
  expect(updateResponseJson.firstname).toBe(bookingUpdateData.firstname);

  let deleteResponse = await request.delete(
    `https://restful-booker.herokuapp.com/booking/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${tokenId}`,
      },
    },
  );
  expect(deleteResponse.status()).toBe(201);
});
