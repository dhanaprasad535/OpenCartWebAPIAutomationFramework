import { test } from "@playwright/test";

test("test1", async () => {
  let obj = [4, 8, 9];
  let [a, b] = obj;
  console.log(a, b);
});
