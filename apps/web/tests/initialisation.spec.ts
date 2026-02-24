import { test, expect } from "@playwright/test";
import { registerUser } from "./utils/auth";
import { onboardUser } from "./utils/onboard";

test("user can register, onboard, & is taken to their desired course", async ({
  page,
}) => {
  await onboardUser(page);
  const freeButton = page.getByTestId("sub-compare-FREE");

  await expect(page).toHaveURL(/\/subscription\/comparison$/);

  await expect(freeButton).toBeVisible();

  await freeButton.click();

  await expect(page).toHaveURL(
    /\/learn\/75975805-3f02-43c2-9106-c990d944dfd2\/10364aea-f968-442f-8e22-7c4c8152962a$/,
  );
  
});
