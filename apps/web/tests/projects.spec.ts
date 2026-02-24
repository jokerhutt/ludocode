import { test, expect } from "@playwright/test";
import { initialiseUser } from "./utils/initialise";

test("user can go to project hub & create project", async ({ page }) => {
  await initialiseUser(page);
  const projectHubButton = page.getByTestId(`nav-button-header-Projects`);

  await expect(projectHubButton).toBeVisible();
  await projectHubButton.click();

  await expect(page).toHaveURL(/\/projects/);

  const createProjectDialogButton = page.getByTestId(
    `create-project-dialog-button`,
  );
  const createProjectButton = page.getByTestId(`create-project-button`);
  const createProjectLanguagePythonOption = page.getByTestId(
    `create-project-language-option-Python`,
  );
  const projectLimitsText = page.getByTestId(`project-limits`);
  const projectHubCards = page.getByTestId(`project-hub-card`);

  await expect(projectHubCards).toHaveCount(0);

  await expect(createProjectDialogButton).toBeVisible();

  await createProjectDialogButton.click();

  await expect(createProjectButton).toBeVisible();
  await expect(createProjectLanguagePythonOption).toBeVisible();

  await createProjectLanguagePythonOption.click();
  await createProjectButton.click();

  await expect(projectLimitsText).toBeVisible();
  await expect(projectLimitsText).toContainText("Projects 0 / 3");

  await expect(projectHubCards).toHaveCount(1);
});
