import { Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { testIds } from "@ludocode/util/test-ids.js";

export async function createProject(page: Page) {
  await expect(page).toHaveURL(/\/projects/);

  const createProjectPythonButton = page.getByTestId(
    testIds.projectHub.createTemplate("python"),
  );

  await expect(createProjectPythonButton).toBeVisible();
  await createProjectPythonButton.click();
}

export async function createProjectFile(page: Page) {
  const openFilePopoverIcon = page.getByTestId(testIds.project.openFilePopover);
  const newFileButton = page.getByTestId(testIds.project.newFileButton);

  await expect(openFilePopoverIcon).toBeVisible();
  await openFilePopoverIcon.click();

  await expect(newFileButton).toBeVisible();
  await newFileButton.click();
}

export async function runCode(page: Page) {
  const runCodeButton = page
    .getByTestId(testIds.project.runCodeButton)
    .and(page.locator(":visible"));
  await expect(runCodeButton).toBeVisible();
  await runCodeButton.click();
}
