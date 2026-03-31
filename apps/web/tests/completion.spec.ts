import { test, expect } from "@playwright/test";
import { initialiseUser } from "./utils/initialise";
import {
  completeLessonPerfect,
  completeLessonWithMistake,
  goToLesson,
} from "./utils/lesson";
import {testIds} from "@ludocode/util/test-ids.js"

test("user completes lesson for the first time ever, shows completion, streak, & courseComplete", async ({
  page,
}) => {
  await initialiseUser(page);
  await goToLesson(page);
  await completeLessonPerfect(page);

  await expect(page).toHaveURL(
    /\/completion\/75975805-3f02-43c2-9106-c990d944dfd2\/a99d4abd-895f-4a4b-b4ea-570fac609f6f\/7eeaaddd-2d87-495e-bd40-24cfd9f06b4b\?step=lesson&coins=20&accuracy=1&oldStreak=0&newStreak=1&completionStatus=COURSE_COMPLETE$/,
  );

  const completionButton = page.getByTestId(testIds.completion.button);

  const coins = page.getByTestId(testIds.completion.coins);
  const accuracy = page.getByTestId(testIds.completion.accuracy);

  await expect(completionButton).toBeVisible();

  await expect(coins).toBeVisible();
  await expect(accuracy).toBeVisible();

  await expect(coins).toContainText("Coins: 20");
  await expect(accuracy).toContainText("Accuracy: 100%");

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
  await expect(courseCompleteBadgeText).toContainText(
    "You've earned the Python badge!",
  );

  await completionButton.click();

  await expect(page).toHaveURL(
    /\/app\/learn\/75975805-3f02-43c2-9106-c990d944dfd2\/a99d4abd-895f-4a4b-b4ea-570fac609f6f$/,
  );
});
