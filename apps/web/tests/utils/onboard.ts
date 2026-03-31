import { Page, expect } from "@playwright/test";
import { registerUser } from "./auth";
import {testIds} from "@ludocode/util/test-ids.js"

export async function onboardUser(page: Page) {
  const nameInput = page.getByTestId(testIds.onboarding.usernameInput);

  const careerInput = page.getByTestId(testIds.onboarding.career("DATA"));
  const languageInput = page.getByTestId(
    testIds.onboarding.course("75975805-3f02-43c2-9106-c990d944dfd2"),
  );
  const experienceInput = page.getByTestId(
    testIds.onboarding.experience(false),
  );

  await registerUser(page);
  await expect(page).toHaveURL(/\/app\/onboarding\/name$/);
  await expect(nameInput).toBeVisible();
  await expect(nameInput).toBeEditable();
  await nameInput.fill("dave");
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page).toHaveURL(/\/app\/onboarding\/career$/);
  await expect(careerInput).toBeVisible();
  await careerInput.click();

  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page).toHaveURL(/\/app\/onboarding\/course$/);
  await expect(languageInput).toBeVisible();
  await languageInput.click();

  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page).toHaveURL(/\/app\/onboarding\/experience$/);
  await expect(experienceInput).toBeVisible();
  await experienceInput.click();

  await page.getByRole("button", { name: "Finish" }).click();

  // await expect(page).toHaveURL(/\/app\/subscription\/comparison$/);
}
