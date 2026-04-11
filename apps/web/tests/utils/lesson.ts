import { type Page, expect } from "@playwright/test";
import { testIds } from "@ludocode/util/test-ids.js";
import type { LudoExercise } from "@ludocode/types";
import {
  interceptExercises,
  navigateToLesson,
  type CourseContext,
  getAllLessons,
  getModuleForLesson,
} from "./course";

async function solveExercise(page: Page, exercise: LudoExercise) {
  const submitButton = page.getByTestId(testIds.lesson.submitButton);
  const submitButtonText = page.getByTestId(testIds.lesson.submitText);

  if (!exercise.interaction) {
    // INFO exercise — just click submit to continue
    await expect(submitButton).toBeVisible();
    await submitButton.click();
    return;
  }

  if (exercise.interaction.type === "CLOZE") {
    const { blanks } = exercise.interaction;
    for (const blank of blanks) {
      const correctAnswer = blank.correctOptions[0];
      const option = page.getByTestId(testIds.exercise.option(correctAnswer));
      await expect(option).toBeVisible();
      await option.click();
    }
    await submitButton.click();
    await expect(submitButtonText).toContainText("CONTINUE");
    await submitButton.click();
    return;
  }

  if (exercise.interaction.type === "SELECT") {
    const correctAnswer = exercise.interaction.correctValue;
    const option = page.getByTestId(testIds.exercise.optionWide(correctAnswer));
    await expect(option).toBeVisible();
    await option.click();
    await submitButton.click();
    await expect(submitButtonText).toContainText("CONTINUE");
    await submitButton.click();
    return;
  }

  // EXECUTABLE
  throw new Error(
    `Unsupported exercise interaction type: ${exercise.interaction.type}`,
  );
}

export async function goToLesson(page: Page, lessonId: string) {
  const exercisesPromise = interceptExercises(page);
  await navigateToLesson(page, lessonId);
  return exercisesPromise;
}

export async function completeLessonPerfect(
  page: Page,
  exercises: LudoExercise[],
) {
  const normalExercises = exercises.filter(
    (e) => !e.interaction || e.interaction.type !== "EXECUTABLE",
  );

  for (const exercise of normalExercises) {
    await solveExercise(page, exercise);
  }

  await expect(page).toHaveURL(/\/sync\//);
}

export async function completeLessonWithMistake(
  page: Page,
  exercises: LudoExercise[],
) {
  const normalExercises = exercises.filter(
    (e) => !e.interaction || e.interaction.type !== "EXECUTABLE",
  );

  let madeFirstMistake = false;

  for (const exercise of normalExercises) {
    const submitButton = page.getByTestId(testIds.lesson.submitButton);
    const submitButtonText = page.getByTestId(testIds.lesson.submitText);

    if (!madeFirstMistake && exercise.interaction) {
      madeFirstMistake = true;

      if (exercise.interaction.type === "CLOZE") {
        const correctAnswer = exercise.interaction.blanks[0].correctOptions[0];
        const wrongOption = exercise.interaction.options.find(
          (o) => o !== correctAnswer,
        );
        if (wrongOption) {
          const option = page.getByTestId(testIds.exercise.option(wrongOption));
          await expect(option).toBeVisible();
          await option.click();
          await submitButton.click();
          await expect(submitButtonText).toContainText("TRY AGAIN");
          await submitButton.click();
          await expect(submitButtonText).toContainText("CHECK");
        }
      } else if (exercise.interaction.type === "SELECT") {
        const correctAnswer = exercise.interaction.correctValue;
        const wrongOption = exercise.interaction.items.find(
          (i) => i !== correctAnswer,
        );
        if (wrongOption) {
          const option = page.getByTestId(
            testIds.exercise.optionWide(wrongOption),
          );
          await expect(option).toBeVisible();
          await option.click();
          await submitButton.click();
          await expect(submitButtonText).toContainText("TRY AGAIN");
          await submitButton.click();
          await expect(submitButtonText).toContainText("CHECK");
        }
      }
    }

    await solveExercise(page, exercise);
  }

  await expect(page).toHaveURL(/\/sync\//);
}

export async function completeCourse(page: Page, ctx: CourseContext) {
  const lessons = getAllLessons(ctx);

  for (const lesson of lessons) {
    const exercises = await goToLesson(page, lesson.id);
    await completeLessonPerfect(page, exercises);

    await expect(page).toHaveURL(/\/completion\//);

    const completionButton = page.getByTestId(testIds.completion.button);
    while (!(await page.url().includes("/learn/"))) {
      await expect(completionButton).toBeVisible();
      await completionButton.click();
      await page.waitForURL(/\/(learn|completion)\//);
    }
  }
}
