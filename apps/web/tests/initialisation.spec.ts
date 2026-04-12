import { test, expect } from "@playwright/test";
import { onboardUser } from "./utils/onboard";

test("user can register, onboard, & is taken to their desired course", async ({
  page,
}) => {
  await onboardUser(page);

  await expect(page).toHaveURL(/\/app\/learn\/[^/]+\/[^/]+$/);
});
