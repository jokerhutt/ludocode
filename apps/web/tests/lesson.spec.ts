import { test, expect } from "@playwright/test";
import { registerUser } from "./utils/auth";
import { initialiseUser } from "./utils/initialise";
import { completeLessonWithMistake, goToLesson } from "./utils/lesson";

test("user can go to lesson", async ({ page }) => {
  await initialiseUser(page);
  const lessonId = "7eeaaddd-2d87-495e-bd40-24cfd9f06b4b";
  const pathButton = page.getByTestId(`path-button-${lessonId}`);
  const pathPopoverButton = page.getByTestId(`path-popover-button-${lessonId}`);

  await expect(pathButton).toBeVisible();
  await pathButton.click();

  await expect(pathPopoverButton).toBeVisible();

  await pathPopoverButton.click();

  await expect(page).toHaveURL(
    /\/lesson\/.*7eeaaddd-2d87-495e-bd40-24cfd9f06b4b.*/,
  );
});

test("user can go to lesson & complete it", async ({ page }) => {
  await initialiseUser(page);
  const lessonId = "7eeaaddd-2d87-495e-bd40-24cfd9f06b4b";
  await goToLesson(page);

  await expect(page).toHaveURL(
    /\/lesson\/75975805-3f02-43c2-9106-c990d944dfd2\/a99d4abd-895f-4a4b-b4ea-570fac609f6f\/7eeaaddd-2d87-495e-bd40-24cfd9f06b4b\?exercise=1$/,
  );

  const firstExerciseLabel = page.getByTestId(`exercise-label-1`);
  await expect(firstExerciseLabel).toBeVisible();
  await expect(firstExerciseLabel).toContainText("Informational");

  const submitButton = page.getByTestId(`lesson-submit-button`);
  await expect(submitButton).toBeVisible();
  await submitButton.click();

  await expect(page).toHaveURL(
    /\/lesson\/75975805-3f02-43c2-9106-c990d944dfd2\/a99d4abd-895f-4a4b-b4ea-570fac609f6f\/7eeaaddd-2d87-495e-bd40-24cfd9f06b4b\?exercise=2$/,
  );

  const secondExerciseLabel = page.getByTestId(`exercise-label-2`);
  await expect(secondExerciseLabel).toBeVisible();
  await expect(secondExerciseLabel).toContainText("Fill in the Blanks");

  const submitButtonText = page.getByTestId(`lesson-submit-text`);

  const secondExerciseCorrectOption = page.getByTestId(`exercise-option-+`);
  const secondExerciseDistractor = page.getByTestId(`exercise-option-=`);
  await expect(secondExerciseDistractor).toBeVisible();
  await expect(secondExerciseCorrectOption).toBeVisible();
  await secondExerciseDistractor.click();
  await submitButton.click();
  await expect(submitButtonText).toContainText("TRY AGAIN");
  await expect(page).toHaveURL(
    /\/lesson\/75975805-3f02-43c2-9106-c990d944dfd2\/a99d4abd-895f-4a4b-b4ea-570fac609f6f\/7eeaaddd-2d87-495e-bd40-24cfd9f06b4b\?exercise=2$/,
  );
  await submitButton.click();

  await expect(submitButtonText).toContainText("CHECK");

  await secondExerciseCorrectOption.click();
  await submitButton.click();
  await expect(submitButtonText).toContainText("CONTINUE");
  await submitButton.click();

  await expect(page).toHaveURL(/\/sync\/7eeaaddd-2d87-495e-bd40-24cfd9f06b4b/);
});
