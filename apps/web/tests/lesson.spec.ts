import { test, expect } from "@playwright/test";
import { initialiseUser } from "./utils/initialise";
import { goToLesson, completeLessonPerfect } from "./utils/lesson";
import { testIds } from "@ludocode/util/test-ids.js";
import { getAllLessons, getModuleForLesson } from "./utils/course";

test("user can go to lesson", async ({ page }) => {
  const ctx = await initialiseUser(page);
  const firstLesson = getAllLessons(ctx)[0];

  const pathButton = page.getByTestId(testIds.path.button(firstLesson.id));
  const pathPopoverButton = page.getByTestId(
    testIds.path.popoverButton(firstLesson.id),
  );

  await expect(pathButton).toBeVisible();
  await pathButton.click();

  await expect(pathPopoverButton).toBeVisible();

  await pathPopoverButton.click();

  await expect(page).toHaveURL(new RegExp(`/lesson/.*${firstLesson.id}`));
});

test("user can go to lesson & complete it", async ({ page }) => {
  const ctx = await initialiseUser(page);
  const firstLesson = getAllLessons(ctx)[0];

  const exercises = await goToLesson(page, firstLesson.id);

  await expect(page).toHaveURL(
    new RegExp(`/lesson/${ctx.courseId}/.*/${firstLesson.id}\\?exercise=1$`),
  );

  await completeLessonPerfect(page, exercises);
});
