import { Page, expect } from "@playwright/test";

export async function registerUser(page: Page) {
  const email = `pw_${crypto.randomUUID()}@ludocode.test`;
  const password = "2121212121";

  await page.context().clearCookies();

  await page.goto("/auth/login");

  await page.getByText("Register here").click();

  await expect(page).toHaveURL(/\/auth\/register/);

  await expect(
    page.getByRole("button", { name: "Sign up & continue" }),
  ).toBeVisible();

  await page.getByRole("textbox", { name: "Your email" }).click();
  await page.getByRole("textbox", { name: "Your email" }).fill(email);
  await page.getByRole("textbox", { name: "Your email" }).press("Tab");
  await page.getByRole("textbox", { name: "Your password" }).fill(password);
  await page.getByRole("checkbox").check();

  await page.getByRole("button", { name: "Sign up & continue" }).click();

  await expect(page).toHaveURL(/\/onboarding/);

  return { email, password };
}