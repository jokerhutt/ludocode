import { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export async function createProject(page: Page) {
  await expect(page).toHaveURL(/\/projects/);

  const createProjectPythonButton = page.getByTestId(
    "create-project-template-python",
  );

  await expect(createProjectPythonButton).toBeVisible();
  await createProjectPythonButton.click();
}

export async function createProjectFile(page: Page) {
  const openFilePopoverIcon = page.getByTestId("open-file-popover-icon");
  const newFileButton = page.getByTestId("new-file-button");

  await expect(openFilePopoverIcon).toBeVisible();
  await openFilePopoverIcon.click();

  await expect(newFileButton).toBeVisible();
  await newFileButton.click();
}

export async function runCode(page: Page) {
  const runCodeButton = page.getByTestId("run-code-button");
  await expect(runCodeButton).toBeVisible();
  await runCodeButton.click();
}
