import { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export async function createProject(page: Page) {
  await expect(page).toHaveURL(/\/projects/);

  const createProjectDialogButton = page.getByTestId(
    `create-project-dialog-button`,
  );
  const createProjectButton = page.getByTestId(`create-project-button`);
  const createProjectLanguagePythonOption = page.getByTestId(
    `create-project-language-option-Python`,
  );

  await expect(createProjectDialogButton).toBeVisible();

  await createProjectDialogButton.click();

  await expect(createProjectButton).toBeVisible();
  await expect(createProjectLanguagePythonOption).toBeVisible();

  await createProjectLanguagePythonOption.click();
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
