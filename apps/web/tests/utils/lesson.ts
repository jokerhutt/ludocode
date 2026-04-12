import { type Page, expect } from "@playwright/test";
import { testIds } from "@ludocode/util/test-ids.js";
import type { LudoExercise } from "@ludocode/types";
import {
  interceptExercises,
  navigateToLesson,
  navigateToModule,
  getModuleLessons,
  getModuleForLesson,
  getAllLessons,
  type CourseContext,
} from "./course";
import { setMonacoValue } from "./monaco";


export function isGuidedLesson(exercises: LudoExercise[]): boolean {
  return exercises.some((e) => e.interaction?.type === "EXECUTABLE");
}

async function solveNormalExercise(page: Page, exercise: LudoExercise) {
  const submitButton = page.getByTestId(testIds.lesson.submitButton);
  const submitButtonText = page.getByTestId(testIds.lesson.submitText);

  if (!exercise.interaction) {
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
}

async function solveGuidedExercise(page: Page, exercise: LudoExercise) {
  const submitButton = page.getByTestId(testIds.guided.runCodeButton).first();
  const submitButtonText = page
    .getByTestId(testIds.guided.runCodeButtonText)
    .first();

  if (!exercise.interaction || exercise.interaction.type !== "EXECUTABLE") {
    await expect(submitButton).toBeVisible();
    await submitButton.click();
    return;
  }

  const { solution } = exercise.interaction;

  await setMonacoValue(page, solution);

  await page.waitForTimeout(500);

  await expect(submitButton).toBeVisible();
  await submitButton.click();

  await expect(submitButtonText).toContainText("CONTINUE", { timeout: 30_000 });

  await page.waitForTimeout(200);

  await submitButton.click();
}

async function solveGuidedExerciseWithMistake(
  page: Page,
  exercise: LudoExercise,
) {
  const submitButton = page.getByTestId(testIds.guided.runCodeButton).first();
  const submitButtonText = page
    .getByTestId(testIds.guided.runCodeButtonText)
    .first();
  const feedbackIncorrect = page.getByTestId(testIds.guided.feedbackIncorrect);

  if (!exercise.interaction || exercise.interaction.type !== "EXECUTABLE") {
    return;
  }

  await setMonacoValue(page, "# wrong answer");
  await page.waitForTimeout(500);
  await expect(submitButton).toBeVisible();
  await submitButton.click();

  await expect(submitButtonText).toContainText("RETRY", { timeout: 30_000 });
  await expect(feedbackIncorrect).toBeVisible();
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
  if (isGuidedLesson(exercises)) {
    for (const exercise of exercises) {
      await solveGuidedExercise(page, exercise);
    }
  } else {
    for (const exercise of exercises) {
      await solveNormalExercise(page, exercise);
    }
  }

  await expect(page).toHaveURL(/\/sync\//);
}

export async function completeLessonWithMistake(
  page: Page,
  exercises: LudoExercise[],
) {
  if (isGuidedLesson(exercises)) {
    let madeFirstMistake = false;

    for (const exercise of exercises) {
      if (!madeFirstMistake && exercise.interaction?.type === "EXECUTABLE") {
        madeFirstMistake = true;
        await solveGuidedExerciseWithMistake(page, exercise);
      }
      await solveGuidedExercise(page, exercise);
    }
  } else {
    let madeFirstMistake = false;

    for (const exercise of exercises) {
      const submitButton = page.getByTestId(testIds.lesson.submitButton);
      const submitButtonText = page.getByTestId(testIds.lesson.submitText);

      if (!madeFirstMistake && exercise.interaction) {
        madeFirstMistake = true;

        if (exercise.interaction.type === "CLOZE") {
          const correctAnswer =
            exercise.interaction.blanks[0].correctOptions[0];
          const wrongOption = exercise.interaction.options.find(
            (o) => o !== correctAnswer,
          );
          if (wrongOption) {
            const option = page.getByTestId(
              testIds.exercise.option(wrongOption),
            );
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

      await solveNormalExercise(page, exercise);
    }
  }

  await expect(page).toHaveURL(/\/sync\//);
}

export async function clickThroughCompletion(page: Page) {
  await expect(page).toHaveURL(/\/completion\//, { timeout: 10_000 });

  const completionButton = page.getByTestId(testIds.completion.button);

  while (!page.url().includes("/learn/")) {
    await expect(completionButton).toBeVisible();
    await completionButton.click();
    await page.waitForURL(/\/(learn|completion)\//);
  }
}

export async function completeCourse(page: Page, ctx: CourseContext) {
  for (let mi = 0; mi < ctx.modules.length; mi++) {
    const mod = ctx.modules[mi];
    const lessons = getModuleLessons(mod);

    if (mi > 0) {
      await navigateToModule(page, mod.id);
    }

    for (const lesson of lessons) {
      const exercises = await goToLesson(page, lesson.id);
      await completeLessonPerfect(page, exercises);
      await clickThroughCompletion(page);
    }
  }
}

export async function completeLessonsUpTo(
  page: Page,
  ctx: CourseContext,
  targetLessonId: string,
) {
  const allLessons = getAllLessons(ctx);
  const targetModule = getModuleForLesson(ctx, targetLessonId);

  for (let mi = 0; mi < ctx.modules.length; mi++) {
    const mod = ctx.modules[mi];
    const lessons = getModuleLessons(mod);

    if (mi > 0) {
      await navigateToModule(page, mod.id);
    }

    for (const lesson of lessons) {
      if (lesson.id === targetLessonId) return;

      const exercises = await goToLesson(page, lesson.id);
      await completeLessonPerfect(page, exercises);
      await clickThroughCompletion(page);
    }
  }
}
