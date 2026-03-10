import { test, expect } from "@playwright/test";

test("User visits hub pages without auth, is taken to auth", async ({
  page,
}) => {
  await page.context().clearCookies();

  await page.goto("/auth/login");
  await expect(page).toHaveURL(/\/auth\/login$/);

  await page.evaluate(() => {
    window.location.href = "/courses";
  });

  await expect(page).toHaveURL(/\/auth\/register/);

  await page.evaluate(() => {
    window.location.href = "/projects";
  });

  await expect(page).toHaveURL(/\/auth\/register/);
});
