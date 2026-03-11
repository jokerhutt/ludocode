import { test, expect } from "@playwright/test";
import { initialiseUser } from "./utils/initialise";
import { createProject, createProjectFile, runCode } from "./utils/project";
import { setMonacoValue } from "./utils/monaco";

test("user can go to project hub & create project", async ({ page }) => {
  await initialiseUser(page);

  const projectHubButton = page.getByTestId(`nav-button-header-Projects`);
  const projectHubCards = page.getByTestId(`project-hub-card`);

  await expect(projectHubCards).toHaveCount(0);
  await expect(projectHubButton).toBeVisible();
  await projectHubButton.click();

  await expect(page).toHaveURL(/\/app\/projects/);
  createProject(page);

  const projectLimitsText = page.getByTestId(`project-limits`);

  await expect(projectLimitsText).toBeVisible();

  await expect(projectHubCards).toHaveCount(1);
});

test("user can go to created project & edit", async ({ page }) => {
  await initialiseUser(page);

  const projectHubButton = page.getByTestId("nav-button-header-Projects");
  const projectHubCards = page.getByTestId("project-hub-card");

  await expect(projectHubButton).toBeVisible();
  await projectHubButton.click();

  await expect(page).toHaveURL(/\/app\/projects/);

  await createProject(page);

  await expect(projectHubCards).toBeVisible();
  await projectHubCards.first().click();

  await expect(page).toHaveURL(/\/app\/project/);

  const projectAsideLeft = page.getByTestId("project-aside-left");
  await expect(projectAsideLeft).toBeVisible();

  const runner = page.getByTestId("project-runner");

  await runCode(page);
  await expect(runner).toContainText("Hello, world!");

  await setMonacoValue(page, "print('Test')");

  await runCode(page);

  await expect(runner).toContainText("Test");
});

test("user can got to created project, run code, & clear output", async ({
  page,
}) => {
  await initialiseUser(page);

  const projectHubButton = page.getByTestId("nav-button-header-Projects");
  const projectHubCards = page.getByTestId("project-hub-card");

  await expect(projectHubButton).toBeVisible();
  await projectHubButton.click();

  await expect(page).toHaveURL(/\/app\/projects/);

  await createProject(page);

  await expect(projectHubCards).toBeVisible();
  await projectHubCards.first().click();

  await expect(page).toHaveURL(/\/app\/project/);

  const projectAsideLeft = page.getByTestId("project-aside-left");
  await expect(projectAsideLeft).toBeVisible();

  await runCode(page);
  const runner = page.getByTestId("project-runner");
  await expect(runner).toContainText("Hello, world!");

  const clearOutputButton = page.getByTestId(`clear-output-icon`);
  await expect(clearOutputButton).toBeVisible();
  await clearOutputButton.click();

  await expect(runner).toBeEmpty();
});

test("user can go to created project & create + import files", async ({
  page,
}) => {
  await initialiseUser(page);

  const projectHubButton = page.getByTestId("nav-button-header-Projects");
  const projectHubCards = page.getByTestId("project-hub-card");

  await expect(projectHubButton).toBeVisible();
  await projectHubButton.click();

  await expect(page).toHaveURL(/\/app\/projects/);

  await createProject(page);

  await expect(projectHubCards).toBeVisible();
  await projectHubCards.first().click();

  await expect(page).toHaveURL(/\/app\/project/);

  const projectAsideLeft = page.getByTestId("project-aside-left");
  await expect(projectAsideLeft).toBeVisible();

  await runCode(page);
  const runner = page.getByTestId("project-runner");
  await expect(runner).toContainText("Hello, world!");

  await createProjectFile(page);

  const newFile = page.getByTestId("tree-file-script_1.py");
  await newFile.click();

  await setMonacoValue(page, "print('I shall come first!')");

  const mainFile = page.getByTestId("tree-file-script.py");
  await mainFile.click();

  await setMonacoValue(page, "import script_1\nprint('I shall come second!')");

  await runCode(page);

  await expect(runner).toContainText("I shall come first!");
  await expect(runner).toContainText("I shall come second!");
});
