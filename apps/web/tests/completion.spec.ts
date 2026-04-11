import { test, expect } from "@playwright/test";
import { initialiseUser } from "./utils/initialise";
import { goToLesson, completeLessonPerfect } from "./utils/lesson";
import { testIds } from "@ludocode/util/test-ids.js";
import { getAllLessons } from "./utils/course";

test("user completes lesson for the first time ever, shows completion, streak, & courseComplete", async ({
  page,
}) => {
  const ctx = await initialiseUser(page);
  const firstLesson = getAllLessons(ctx)[0];

  const exercises = await goToLesson(page, firstLesson.id);
  await completeLessonPerfect(page, exercises);

  // After sync, should land on completion page with lesson step
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
