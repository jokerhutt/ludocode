import { mutationOptions } from "@tanstack/react-query";
import { type LudoCourse } from "@ludocode/types/Catalog/LudoCourse.ts";
import { type CreateCourseRequest } from "@ludocode/types/Builder/CreateCourseRequest.ts";
import { ludoDelete, ludoPost, ludoPut } from "@ludocode/api/fetcher";
import { adminApi } from "@/constants/api/adminApi";
import {
  type CurriculumDraft,
  type CurriculumDraftLessonForm,
  type LanguageMetadata,
  type ModifyLanguageRequest,
  type SubjectsDraftSnapshot,
} from "@ludocode/types";

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
  updateLanguage: (languageId: number) => {
    return mutationOptions<LanguageMetadata[], Error, ModifyLanguageRequest>({
      mutationKey: ["updateLanguage"],
      mutationFn: (variables) =>
        ludoPut<LanguageMetadata[], ModifyLanguageRequest>(
          adminApi.languages.byAdminId(languageId),
          variables,
          true,
        ),
    });
  },
  deleteLanguage: (languageId: number) => {
    return mutationOptions<LanguageMetadata[], Error, void>({
      mutationKey: ["deleteLanguage"],
      mutationFn: () =>
        ludoDelete<LanguageMetadata[]>(
          adminApi.languages.byAdminId(languageId),
          true,
        ),
    });
  },
  createLanguage: () => {
    return mutationOptions<LanguageMetadata[], Error, ModifyLanguageRequest>({
      mutationKey: ["createLanguage"],
      mutationFn: (variables) =>
        ludoPost<LanguageMetadata[], ModifyLanguageRequest>(
          adminApi.languages.adminBase,
          variables,
          true,
        ),
    });
  },
  updateSubject: (subjectId: number) => {
    return mutationOptions<
      SubjectsDraftSnapshot[],
      Error,
      SubjectsDraftSnapshot
    >({
      mutationKey: ["updateSubject"],
      mutationFn: (variables) =>
        ludoPut<SubjectsDraftSnapshot[], SubjectsDraftSnapshot>(
          adminApi.subjects.byAdminId(subjectId),
          variables,
          true,
        ),
    });
  },
  deleteSubject: (subjectid: number) => {
    return mutationOptions<SubjectsDraftSnapshot[], Error, void>({
      mutationKey: ["deleteSubject"],
      mutationFn: () =>
        ludoDelete<SubjectsDraftSnapshot[]>(
          adminApi.subjects.byAdminId(subjectid),
          true,
        ),
    });
  },
  createSubject: () => {
    return mutationOptions<SubjectsDraftSnapshot[], Error, SubjectsDraftSnapshot>({
      mutationKey: ["createSubject"],
      mutationFn: (variables) =>
        ludoPost<SubjectsDraftSnapshot[], SubjectsDraftSnapshot>(
          adminApi.subjects.adminBase,
          variables,
          true,
        ),
    });
  },
};
