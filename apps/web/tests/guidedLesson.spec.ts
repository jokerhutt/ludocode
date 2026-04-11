import { test, expect } from "@playwright/test";
import { initialiseUser } from "./utils/initialise";
import {
  goToLesson,
  completeLessonPerfect,
  completeLessonsUpTo,
  isGuidedLesson,
} from "./utils/lesson";
import { setMonacoValue } from "./utils/monaco";
import { testIds } from "@ludocode/util/test-ids.js";
import { getFirstGuidedLesson } from "./utils/course";

test.describe("guided lessons", () => {
  test("course has a guided lesson available", async ({ page }) => {
    const ctx = await initialiseUser(page);

    const guidedLesson = getFirstGuidedLesson(ctx);
    expect(guidedLesson).toBeDefined();
    expect(guidedLesson.id).toBeTruthy();
  });

  test("user can navigate to a guided lesson", async ({ page }) => {
    const ctx = await initialiseUser(page);
    const guidedLesson = getFirstGuidedLesson(ctx);

    await completeLessonsUpTo(page, ctx, guidedLesson.id);

    const exercises = await goToLesson(page, guidedLesson.id);

    await expect(page).toHaveURL(
      new RegExp(`/lesson/${ctx.courseId}/.*/${guidedLesson.id}\\?exercise=1$`),
    );

    expect(isGuidedLesson(exercises)).toBe(true);

    const guidedSubmitButton = page
      .getByTestId(testIds.guided.runCodeButton)
      .first();
    await expect(guidedSubmitButton).toBeVisible();
  });

  test("user can complete a guided lesson with correct solution", async ({
    page,
  }) => {
    const ctx = await initialiseUser(page);
    const guidedLesson = getFirstGuidedLesson(ctx);

    await completeLessonsUpTo(page, ctx, guidedLesson.id);

    const exercises = await goToLesson(page, guidedLesson.id);

    await completeLessonPerfect(page, exercises);

    await expect(page).toHaveURL(/\/completion\//);
  });

  test("user sees RETRY when submitting wrong code in guided lesson", async ({
    page,
  }) => {
    const ctx = await initialiseUser(page);
    const guidedLesson = getFirstGuidedLesson(ctx);

    await completeLessonsUpTo(page, ctx, guidedLesson.id);

    const exercises = await goToLesson(page, guidedLesson.id);

    const execExercise = exercises.find(
      (e) => e.interaction?.type === "EXECUTABLE",
    );
    expect(execExercise).toBeDefined();

    const guidedSubmitButton = page
      .getByTestId(testIds.guided.runCodeButton)
      .first();
    for (const exercise of exercises) {
      if (exercise.id === execExercise!.id) break;
      if (!exercise.interaction) {
        await expect(guidedSubmitButton).toBeVisible();
        await guidedSubmitButton.click();
      }
    }

    const guidedSubmitText = page
      .getByTestId(testIds.guided.runCodeButtonText)
      .first();
    const runner = page.getByTestId(testIds.project.runner);

    await setMonacoValue(page, "# this is intentionally wrong");
    await page.waitForTimeout(500);
    await expect(guidedSubmitButton).toBeVisible();
    await guidedSubmitButton.click();

    await expect(guidedSubmitText).toContainText("RETRY", { timeout: 30_000 });

    const feedbackIncorrect = page.getByTestId(
      testIds.guided.feedbackIncorrect,
    );
    await expect(feedbackIncorrect).toBeVisible();

    await expect(runner).toBeVisible();

    const solution =
      execExercise!.interaction?.type === "EXECUTABLE"
        ? execExercise!.interaction.solution
        : "";
    await setMonacoValue(page, solution);
    await page.waitForTimeout(500);
    await guidedSubmitButton.click();

    await expect(guidedSubmitText).toContainText("CONTINUE", {
      timeout: 30_000,
    });

    const feedbackCorrect = page.getByTestId(testIds.guided.feedbackCorrect);
    await expect(feedbackCorrect).toBeVisible();
  });
});
