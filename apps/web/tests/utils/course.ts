import { type Page, expect } from "@playwright/test";
import { testIds } from "@ludocode/util/test-ids.js";
import type { LudoExercise, LudoLesson } from "@ludocode/types";

type FlatLesson = { id: string; orderIndex: number };
type FlatModule = { id: string; orderIndex: number; lessons: FlatLesson[] };
type FlatCourseTree = { courseId: string; modules: FlatModule[] };

export type CourseContext = {
  courseId: string;
  modules: FlatModule[];
  lessonDetails: LudoLesson[];
};

export async function interceptCourseTree(page: Page): Promise<CourseContext> {
  const ctx: CourseContext = {
    courseId: "",
    modules: [],
    lessonDetails: [],
  };

  return new Promise<CourseContext>((resolve) => {
    page.route("**/api/v1/catalog/courses/*/tree", async (route) => {
      const response = await route.fetch();
      const tree: FlatCourseTree = await response.json();
      ctx.courseId = tree.courseId;
      ctx.modules = tree.modules.sort((a, b) => a.orderIndex - b.orderIndex);

      const allLessonIds = ctx.modules.flatMap((m) =>
        m.lessons.map((l) => l.id),
      );
      if (allLessonIds.length > 0) {
        const baseUrl = new URL(route.request().url()).origin;
        const resp = await page.request.get(
          `${baseUrl}/api/v1/lessons?lessonIds=${allLessonIds.join(",")}`,
        );
        ctx.lessonDetails = await resp.json();
      }

      resolve(ctx);
      await route.fulfill({ response });
    });
  });
}

export function getAllLessons(ctx: CourseContext): FlatLesson[] {
  return ctx.modules.flatMap((m) =>
    [...m.lessons].sort((a, b) => a.orderIndex - b.orderIndex),
  );
}
export function getFirstModule(ctx: CourseContext): FlatModule {
  return ctx.modules[0];
}

export function getModuleForLesson(
  ctx: CourseContext,
  lessonId: string,
): FlatModule {
  const mod = ctx.modules.find((m) => m.lessons.some((l) => l.id === lessonId));
  if (!mod) throw new Error(`No module found containing lesson ${lessonId}`);
  return mod;
}

export function getFirstGuidedLesson(ctx: CourseContext): FlatLesson {
  const guidedDetail = ctx.lessonDetails.find((l) => l.lessonType === "GUIDED");
  if (!guidedDetail) throw new Error("No guided lesson found in course");

  const flat = getAllLessons(ctx).find((l) => l.id === guidedDetail.id);
  if (!flat)
    throw new Error(`Guided lesson ${guidedDetail.id} not in course tree`);
  return flat;
}

export function getFirstNormalLesson(ctx: CourseContext): FlatLesson {
  const normalDetail = ctx.lessonDetails.find((l) => l.lessonType === "NORMAL");
  if (!normalDetail) throw new Error("No normal lesson found in course");

  const flat = getAllLessons(ctx).find((l) => l.id === normalDetail.id);
  if (!flat)
    throw new Error(`Normal lesson ${normalDetail.id} not in course tree`);
  return flat;
}

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

export async function navigateToLesson(page: Page, lessonId: string) {
  const pathButton = page.getByTestId(testIds.path.button(lessonId));
  const pathPopoverButton = page.getByTestId(
    testIds.path.popoverButton(lessonId),
  );

  await expect(pathButton).toBeVisible();
  await pathButton.click();
  await expect(pathPopoverButton).toBeVisible();
  await pathPopoverButton.click();
}

export async function navigateToModule(page: Page, moduleId: string) {
  const moduleItem = page.getByTestId(testIds.module.item(moduleId)).first();
  await expect(moduleItem).toBeVisible();
  await moduleItem.click();

  await page.waitForURL(new RegExp(`/learn/[^/]+/${moduleId}$`));
}

export function getModuleLessons(mod: FlatModule): FlatLesson[] {
  return [...mod.lessons].sort((a, b) => a.orderIndex - b.orderIndex);
}
