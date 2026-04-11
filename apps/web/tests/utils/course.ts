import { type Page, expect } from "@playwright/test";
import { testIds } from "@ludocode/util/test-ids.js";
import type { LudoExercise } from "@ludocode/types";

// ── Types mirrored from FlatCourseTree ──────────────────────
type FlatLesson = { id: string; orderIndex: number };
type FlatModule = { id: string; orderIndex: number; lessons: FlatLesson[] };
type FlatCourseTree = { courseId: string; modules: FlatModule[] };

// ── Course context captured via API interception ────────────
export type CourseContext = {
  courseId: string;
  modules: FlatModule[];
};

/**
 * Intercepts the course-tree API call to capture the course structure
 * (courseId, modules, lessons) dynamically.
 *
 * Must be called **before** navigating to the learn page.
 */
export async function interceptCourseTree(page: Page): Promise<CourseContext> {
  return new Promise<CourseContext>((resolve) => {
    page.route("**/api/v1/catalog/courses/*/tree", async (route) => {
      const response = await route.fetch();
      const tree: FlatCourseTree = await response.json();
      resolve({
        courseId: tree.courseId,
        modules: tree.modules.sort((a, b) => a.orderIndex - b.orderIndex),
      });
      await route.fulfill({ response });
    });
  });
}

/**
 * Returns all lessons across all modules, sorted by module then lesson order.
 */
export function getAllLessons(ctx: CourseContext): FlatLesson[] {
  return ctx.modules.flatMap((m) =>
    [...m.lessons].sort((a, b) => a.orderIndex - b.orderIndex),
  );
}

/**
 * Returns the first module in the course tree.
 */
export function getFirstModule(ctx: CourseContext): FlatModule {
  return ctx.modules[0];
}

/**
 * Returns the module that contains the given lesson.
 */
export function getModuleForLesson(
  ctx: CourseContext,
  lessonId: string,
): FlatModule {
  const mod = ctx.modules.find((m) => m.lessons.some((l) => l.id === lessonId));
  if (!mod) throw new Error(`No module found containing lesson ${lessonId}`);
  return mod;
}

// ── Exercise data captured via API interception ─────────────

/**
 * Intercepts the exercises API call for a lesson and returns the exercises.
 *
 * Must be called **before** navigating to the lesson page.
 * Resolves when the API response is captured.
 */
export function interceptExercises(page: Page): Promise<LudoExercise[]> {
  return new Promise<LudoExercise[]>((resolve) => {
    page.route("**/api/v1/lessons/*/exercises", async (route) => {
      const response = await route.fetch();
      const exercises: LudoExercise[] = await response.json();
      resolve(exercises.sort((a, b) => a.orderIndex - b.orderIndex));
      await route.fulfill({ response });
    });
  });
}

/**
 * Navigates to a lesson from the learn/module page by clicking
 * the path button and popover button.
 */
export async function navigateToLesson(page: Page, lessonId: string) {
  const pathButton = page.getByTestId(testIds.path.button(lessonId));
  const pathPopoverButton = page.getByTestId(
    testIds.path.popoverButton(lessonId),
  );

  await expect(pathButton).toBeVisible();
  await pathButton.click();
  await expect(pathPopoverButton).toBeVisible();
  await pathPopoverButton.click();

  await expect(page).toHaveURL(new RegExp(`/lesson/.*${lessonId}`));
}
