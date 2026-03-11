import { test, expect } from "@playwright/test";

test("user can register and reach onboarding", async ({ page }) => {
  page.on("console", (msg) => {
    console.log("BROWSER LOG:", msg.text());
  });

  page.on("pageerror", (err) => {
    console.log("PAGE ERROR:", err);
  });
  const email = `pw_${crypto.randomUUID()}@ludocode.test`;
  const password = "2121212121";

  const tosCheckbox = page.getByTestId("register-tos");

  await page.context().clearCookies();

  await page.goto("/auth/login");

  await page.getByText("Register here").click();

  await expect(page).toHaveURL(/\/auth\/register/);

  await expect(
    page.getByRole("button", { name: "Sign up & continue" }),
  ).toBeVisible();

  await expect(tosCheckbox).toBeVisible();

  await page.getByRole("textbox", { name: "Your email" }).click();
  await page.getByRole("textbox", { name: "Your email" }).fill(email);
  await page.getByRole("textbox", { name: "Your email" }).press("Tab");
  await page.getByRole("textbox", { name: "Your password" }).fill(password);
  await tosCheckbox.check();

  await page.getByRole("button", { name: "Sign up & continue" }).click();

  await expect(page).toHaveURL(/\/app\/onboarding/);
});
