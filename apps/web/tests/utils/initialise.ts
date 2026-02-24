import { Page, expect } from "@playwright/test";
import { registerUser } from "./auth";
import { onboardUser } from "./onboard";

export async function initialiseUser(page: Page) {
  await onboardUser(page);
  const freeButton = page.getByTestId("sub-compare-FREE");

  await expect(page).toHaveURL(/\/subscription\/comparison$/);

  await expect(freeButton).toBeVisible();

  await freeButton.click();

  await expect(page).toHaveURL(
    /\/learn\/75975805-3f02-43c2-9106-c990d944dfd2\/a99d4abd-895f-4a4b-b4ea-570fac609f6f$/,
  );
}
