import { type Page, expect } from "@playwright/test";
import {testIds} from "@ludocode/util/test-ids.js"

export async function goToLesson(page: Page) {
  const lessonId = "7eeaaddd-2d87-495e-bd40-24cfd9f06b4b";
  const pathButton = page.getByTestId(testIds.path.button(lessonId));
  const pathPopoverButton = page.getByTestId(
    testIds.path.popoverButton(lessonId),
  );

  await expect(pathButton).toBeVisible();
  await pathButton.click();

  await expect(pathPopoverButton).toBeVisible();

  await pathPopoverButton.click();

  await expect(page).toHaveURL(
    /\/lesson\/.*7eeaaddd-2d87-495e-bd40-24cfd9f06b4b.*/,
  );
}

export async function completeLessonWithMistake(page: Page) {
  await expect(page).toHaveURL(
    /\/lesson\/75975805-3f02-43c2-9106-c990d944dfd2\/a99d4abd-895f-4a4b-b4ea-570fac609f6f\/7eeaaddd-2d87-495e-bd40-24cfd9f06b4b\?exercise=1$/,
  );

  const submitButton = page.getByTestId(testIds.lesson.submitButton);
  await expect(submitButton).toBeVisible();
  await submitButton.click();

  await expect(page).toHaveURL(
    /\/lesson\/75975805-3f02-43c2-9106-c990d944dfd2\/a99d4abd-895f-4a4b-b4ea-570fac609f6f\/7eeaaddd-2d87-495e-bd40-24cfd9f06b4b\?exercise=2$/,
  );
  const submitButtonText = page.getByTestId(testIds.lesson.submitText);

  const secondExerciseCorrectOption = page.getByTestId(
    testIds.exercise.option("+"),
  );
  const secondExerciseDistractor = page.getByTestId(
    testIds.exercise.option("="),
  );
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
}

export async function completeLessonPerfect(page: Page) {
  await expect(page).toHaveURL(
    /\/lesson\/75975805-3f02-43c2-9106-c990d944dfd2\/a99d4abd-895f-4a4b-b4ea-570fac609f6f\/7eeaaddd-2d87-495e-bd40-24cfd9f06b4b\?exercise=1$/,
  );

  const submitButton = page.getByTestId(testIds.lesson.submitButton);
  await expect(submitButton).toBeVisible();
  await submitButton.click();

  await expect(page).toHaveURL(
    /\/lesson\/75975805-3f02-43c2-9106-c990d944dfd2\/a99d4abd-895f-4a4b-b4ea-570fac609f6f\/7eeaaddd-2d87-495e-bd40-24cfd9f06b4b\?exercise=2$/,
  );

  const submitButtonText = page.getByTestId(testIds.lesson.submitText);

  const secondExerciseCorrectOption = page.getByTestId(
    testIds.exercise.option("+"),
  );
  const secondExerciseDistractor = page.getByTestId(
    testIds.exercise.option("="),
  );
  await expect(secondExerciseDistractor).toBeVisible();
  await expect(secondExerciseCorrectOption).toBeVisible();
  await secondExerciseCorrectOption.click();
  await submitButton.click();
  await expect(submitButtonText).toContainText("CONTINUE");
  await submitButton.click();

  await expect(page).toHaveURL(/\/sync\/7eeaaddd-2d87-495e-bd40-24cfd9f06b4b/);
}
