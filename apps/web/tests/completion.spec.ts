import { test, expect } from "@playwright/test";
import { initialiseUser } from "./utils/initialise";
import {
  goToLesson,
  completeLessonPerfect,
  clickThroughCompletion,
  completeCourse,
} from "./utils/lesson";
import { testIds } from "@ludocode/util/test-ids.js";
import {
  getAllLessons,
  getModuleLessons,
  navigateToModule,
} from "./utils/course";

test("user completes first lesson and sees lesson completion & streak", async ({
  page,
}) => {
  const ctx = await initialiseUser(page);
  const firstLesson = getAllLessons(ctx)[0];

  const exercises = await goToLesson(page, firstLesson.id);
  await completeLessonPerfect(page, exercises);

  await expect(page).toHaveURL(/\/completion\/.*\?step=lesson/);

  const completionButton = page.getByTestId(testIds.completion.button);

  const xp = page.getByTestId(testIds.completion.xp);
  const accuracy = page.getByTestId(testIds.completion.accuracy);

  await expect(completionButton).toBeVisible();

  await expect(xp).toBeVisible();
  await expect(accuracy).toBeVisible();

  await expect(xp).toContainText("+");
  await expect(accuracy).toContainText("%");

  await completionButton.click();

  await expect(page).toHaveURL(/step=streak/);

  const streakCompleteText = page.getByTestId(testIds.completion.streakText);

  await expect(streakCompleteText).toBeVisible();
  await expect(streakCompleteText).toContainText("Day Streak!");

  await expect(completionButton).toBeVisible();

  await completionButton.click();

  await expect(page).toHaveURL(/\/app\/learn\//);
});

test("user completes entire course and sees course complete screen", async ({
  page,
}) => {
  const ctx = await initialiseUser(page);

  const allLessons = getAllLessons(ctx);
  const allButLast = allLessons.slice(0, -1);
  const lastLesson = allLessons[allLessons.length - 1];

  for (let mi = 0; mi < ctx.modules.length; mi++) {
    const mod = ctx.modules[mi];
    const lessons = getModuleLessons(mod);

    if (mi > 0) {
      await navigateToModule(page, mod.id);
    }

    for (const lesson of lessons) {
      if (lesson.id === lastLesson.id) continue;

      const exercises = await goToLesson(page, lesson.id);
      await completeLessonPerfect(page, exercises);
      await clickThroughCompletion(page);
    }
  }

  const lastModule = ctx.modules[ctx.modules.length - 1];
  if (ctx.modules.length > 1) {
    const currentUrl = page.url();
    if (!currentUrl.includes(lastModule.id)) {
      await navigateToModule(page, lastModule.id);
    }
  }

  const exercises = await goToLesson(page, lastLesson.id);
  await completeLessonPerfect(page, exercises);

  await expect(page).toHaveURL(/\/completion\/.*\?step=lesson/);

  const completionButton = page.getByTestId(testIds.completion.button);
  await expect(completionButton).toBeVisible();
  await completionButton.click();

  while (!page.url().includes("step=course")) {
    await expect(completionButton).toBeVisible();
    await completionButton.click();
    await page.waitForURL(/step=(streak|course)/);
  }

  await expect(page).toHaveURL(/step=course/);

  const courseCompleteHeader = page.getByTestId(
    testIds.completion.courseCompleteHeader,
  );
  const courseCompleteCongratulation = page.getByTestId(
    testIds.completion.courseCompleteCongratulation,
  );
  const courseCompleteBadgeText = page.getByTestId(
    testIds.completion.courseCompleteBadgeText,
  );
  await expect(courseCompleteHeader).toBeVisible();
  await expect(courseCompleteBadgeText).toBeVisible();
  await expect(courseCompleteCongratulation).toBeVisible();
  await expect(courseCompleteHeader).toContainText("Course Complete!");

  await completionButton.click();

  await expect(page).toHaveURL(/\/app\/learn\//);
});
