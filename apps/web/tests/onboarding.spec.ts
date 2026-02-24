import { test, expect } from "@playwright/test";
import { registerUser } from "./utils/auth";

test("user can onboard", async ({ page }) => {
  const nameInput = page.getByTestId("username-input");

  const careerInput = page.getByTestId("onb-career-DATA");
  const languageInput = page.getByTestId(
    "onb-course-75975805-3f02-43c2-9106-c990d944dfd2",
  );
  const experienceInput = page.getByTestId("onb-exp-false");

  await registerUser(page);
  await expect(page).toHaveURL(/\/onboarding\/name$/);
  await expect(nameInput).toBeVisible();
  await expect(nameInput).toBeEditable();
  await nameInput.fill("dave");
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page).toHaveURL(/\/onboarding\/career$/);
  await expect(careerInput).toBeVisible();
  await careerInput.click();

  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page).toHaveURL(/\/onboarding\/course$/);
  await expect(languageInput).toBeVisible();
  await languageInput.click();

  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page).toHaveURL(/\/onboarding\/experience$/);
  await expect(experienceInput).toBeVisible();
  await experienceInput.click();

  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page).toHaveURL(/\/subscription\/comparison$/);
});
