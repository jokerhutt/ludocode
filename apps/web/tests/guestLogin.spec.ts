import { expect, test, type Page } from "@playwright/test";
import { testIds } from "@ludocode/util/test-ids.js";

async function expectGuestLoginComplete(page: Page) {
  await expect(page).toHaveURL(/\/app\/learn\/[^/]+\/[^/]+$/, {
    timeout: 30_000,
  });
  await expect(
    page.getByTestId(testIds.nav.button("header", "Learn")),
  ).toBeVisible();
  await expect(page.getByTestId(testIds.onboarding.usernameInput)).toBeHidden();
}

test.describe("guest login", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test("user can log in as guest from the landing page CTA", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Try as Guest" }).click();

    await expectGuestLoginComplete(page);
  });

  test("user can visit the guest auth route directly", async ({ page }) => {
    await page.goto("/auth/guest");

    await expectGuestLoginComplete(page);
  });

  test("user can log in as guest from the registration page link", async ({
    page,
  }) => {
    await page.goto("/auth/register");
    await page.getByText("Use a guest account").click();

    await expectGuestLoginComplete(page);
  });
});
