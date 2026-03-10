import { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export async function createProject(page: Page) {
  await expect(page).toHaveURL(/\/projects/);

  const createProjectDialogButton = page.getByTestId(
    `create-project-dialog-button`,
  );

  const createProjectSelectTrigger = page.getByTestId(`select-trigger`);
  const createProjectPythonOption = page.getByTestId(`select-item-python`);

  const createProjectButton = page.getByTestId(`create-project-button`);

  await expect(createProjectDialogButton).toBeVisible();

  await createProjectDialogButton.click();

  await expect(createProjectButton).toBeVisible();
  await expect(createProjectSelectTrigger).toBeVisible();

  await createProjectSelectTrigger.click();
  await expect(createProjectPythonOption).toBeVisible();
  await createProjectPythonOption.click();

  await createProjectButton.click();
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
