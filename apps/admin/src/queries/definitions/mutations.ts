import { mutationOptions } from "@tanstack/react-query";
import { type LudoCourse } from "@ludocode/types/Catalog/LudoCourse.ts";
import { type CreateCourseRequest } from "@ludocode/types/Builder/CreateCourseRequest.ts";
import { ludoDelete, ludoPost, ludoPut } from "@ludocode/api/fetcher.ts";
import { adminApi } from "@/constants/api/adminApi.ts";
import {
  type ChangeLanguageRequest,
  type CurriculumDraft,
  type CurriculumDraftLessonForm,
  type LudoBannerSnapshot,
} from "@ludocode/types";
import type { ChangeCourseIconRequest } from "@/features/curriculum/hooks/useChangeIcon";
import type { ChangeCourseStatusRequest } from "@/features/courses-hub/hooks/useToggleCourseVisibility";
import type { ChangeCourseTitleRequest } from "@/features/curriculum/hooks/useChangeCourseTitle";
import type { CreateBannerRequest } from "../mutations/useCreateBanner";

export const mutations = {
  createCourse: () => {
    return mutationOptions<LudoCourse[], Error, CreateCourseRequest>({
      mutationKey: ["createCourse"],
      mutationFn: (variables) =>
        ludoPost<LudoCourse[], CreateCourseRequest>(
          adminApi.snapshots.course,
          variables,
          true,
        ),
    });
  },

  createBanner: () => {
    return mutationOptions<LudoBannerSnapshot[], Error, CreateBannerRequest>({
      mutationKey: ["createBanner"],
      mutationFn: (variables) =>
        ludoPost<LudoBannerSnapshot[], CreateBannerRequest>(
          adminApi.banner.adminBase,
          variables,
          true,
        ),
    });
  },

  deleteBanner: (bannerId: number) => {
    return mutationOptions<LudoBannerSnapshot[], Error, void>({
      mutationKey: ["deleteBanner"],
      mutationFn: () =>
        ludoDelete<LudoBannerSnapshot[]>(
          adminApi.banner.byAdminId(bannerId),
          true,
        ),
    });
  },

  createCourseYaml: () => {
    return mutationOptions<void, Error, File>({
      mutationKey: ["createCourseYaml"],
      mutationFn: async (file: File) => {
        const yamlText = await file.text();
        const res = await fetch(`${adminApi.snapshots.course}?mode=yaml`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-yaml",
          },
          credentials: "include",
          body: yamlText,
        });
        if (!res.ok)
          throw new Error(`Failed to upload YAML course → ${res.status}`);
      },
    });
  },
  updateCourse: (courseId: string) => {
    return mutationOptions<CurriculumDraft, Error, CurriculumDraft>({
      mutationKey: ["updateCurriculum"],
      mutationFn: (variables) =>
        ludoPut<CurriculumDraft, CurriculumDraft>(
          adminApi.snapshots.byCourseCurriculum(courseId),
          variables,
          true,
        ),
    });
  },
  updateCourseYaml: (courseId: string) => {
    return mutationOptions<void, Error, File>({
      mutationKey: ["updateCourseYaml"],
      mutationFn: async (file: File) => {
        const yamlText = await file.text();
        const res = await fetch(
          `${adminApi.snapshots.byCourseCurriculum(courseId)}?mode=yaml`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/x-yaml",
            },
            credentials: "include",
            body: yamlText,
          },
        );
        if (!res.ok)
          throw new Error(`Failed to upload YAML curriculum → ${res.status}`);
      },
    });
  },
  updateLesson: (lessonId: string) => {
    return mutationOptions<
      CurriculumDraftLessonForm,
      Error,
      CurriculumDraftLessonForm
    >({
      mutationKey: ["updateLesson"],
      mutationFn: (variables) =>
        ludoPut<CurriculumDraftLessonForm, CurriculumDraftLessonForm>(
          adminApi.lessons.byLessonCurriculum(lessonId),
          variables,
          true,
        ),
    });
  },
  deleteCourse: (courseId: string) => {
    return mutationOptions<LudoCourse[], Error, void>({
      mutationKey: ["deleteCourse"],
      mutationFn: () =>
        ludoDelete<LudoCourse[]>(adminApi.snapshots.byCourse(courseId), true),
    });
  },
  changeCourseLanguage: (courseId: string) => {
    return mutationOptions<LudoCourse[], Error, ChangeLanguageRequest>({
      mutationKey: ["changeCourseLanguage"],
      mutationFn: (variables) =>
        ludoPut<LudoCourse[], ChangeLanguageRequest>(
          adminApi.snapshots.byCourseCurriculumLanguage(courseId),
          variables,
          true,
        ),
    });
  },
  changeCourseStatus: (courseId: string) => {
    return mutationOptions<LudoCourse[], Error, ChangeCourseStatusRequest>({
      mutationKey: ["changeCourseStatus"],
      mutationFn: (variables) =>
        ludoPut<LudoCourse[], ChangeCourseStatusRequest>(
          adminApi.snapshots.byCourseStatus(courseId),
          variables,
          true,
        ),
    });
  },
  changeCourseIcon: (courseId: string) => {
    return mutationOptions<LudoCourse[], Error, ChangeCourseIconRequest>({
      mutationKey: ["changeCourseIcon"],
      mutationFn: (variables) =>
        ludoPut<LudoCourse[], ChangeCourseIconRequest>(
          adminApi.snapshots.byCourseCurriculumIcon(courseId),
          variables,
          true,
        ),
    });
  },
  changeCourseTitle: (courseId: string) => {
    return mutationOptions<LudoCourse[], Error, ChangeCourseTitleRequest>({
      mutationKey: ["changeCourseTitle"],
      mutationFn: (variables) =>
        ludoPut<LudoCourse[], ChangeCourseTitleRequest>(
          adminApi.snapshots.byCourseCurriculumTitle(courseId),
          variables,
          true,
        ),
    });
  },
};
