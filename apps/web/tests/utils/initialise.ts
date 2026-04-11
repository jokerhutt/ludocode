import { type Page, expect } from "@playwright/test";
import { onboardUser } from "./onboard";
import { interceptCourseTree, type CourseContext } from "./course";

export async function initialiseUser(page: Page): Promise<CourseContext> {
  const courseTreePromise = interceptCourseTree(page);
  await onboardUser(page);

  await expect(page).toHaveURL(/\/app\/learn\/[^/]+\/[^/]+$/);

  return courseTreePromise;
}
