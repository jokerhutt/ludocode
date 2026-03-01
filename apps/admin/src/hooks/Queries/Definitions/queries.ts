import { queryOptions } from "@tanstack/react-query";
import { qk } from "@/hooks/Queries/Definitions/qk";
import { userBatcher } from "@/hooks/Queries/Definitions/batchers";
import {
  type PistonRuntime,
  type CourseSnap,
  type LanguageMetadata,
  type LudoCourse,
  type LudoUser,
  type LudoCourseSubject,
  type CurriculumDraft,
  type CurriculumDraftLessonForm,
  type SubjectsDraftSnapshot,
  type ActiveFeaturesResponse,
} from "@ludocode/types";
import { ludoGet } from "@ludocode/api/fetcher";
import { adminApi } from "@/constants/api/adminApi";

export const qo = {
  user: (userId: string) =>
    queryOptions({
      queryKey: qk.user(userId),
      queryFn: () => userBatcher.fetch(userId),
      staleTime: 60_00,
    }),

  currentUser: () =>
    queryOptions({
      queryKey: qk.currentUser(),
      queryFn: () => ludoGet<LudoUser>(adminApi.auth.me, true),
      staleTime: 60_000,
      retry: false,
    }),

  courseSnapshot: (courseId: string) =>
    queryOptions({
      queryKey: qk.courseSnapshot(courseId),
      queryFn: () =>
        ludoGet<CourseSnap>(adminApi.snapshots.byCourse(courseId), true),
      staleTime: 60_000 * 10,
    }),

  curriculumSnapshot: (courseId: string) =>
    queryOptions({
      queryKey: qk.curriculum(courseId),
      queryFn: () =>
        ludoGet<CurriculumDraft>(
          adminApi.snapshots.byCourseCurriculum(courseId),
          true,
        ),
      staleTime: 60_000 * 10,
    }),

  lessonCurriculumSnapshot: (lessonId: string) =>
    queryOptions({
      queryKey: qk.curriculumLesson(lessonId),
      queryFn: () =>
        ludoGet<CurriculumDraftLessonForm>(
          adminApi.lessons.byLessonCurriculum(lessonId),
          true,
        ),
      staleTime: 60_000 * 10,
    }),

  runtimes: () =>
    queryOptions({
      queryKey: qk.runtimes(),
      queryFn: () =>
        ludoGet<PistonRuntime[]>(adminApi.external.piston.runtimes, false),
      staleTime: 60_000 * 10,
    }),

  languages: () =>
    queryOptions<LanguageMetadata[]>({
      queryKey: qk.languages(),
      queryFn: () => ludoGet<LanguageMetadata[]>(adminApi.languages.base, true),
      staleTime: 60_00,
    }),

  allSubjects: () =>
    queryOptions<SubjectsDraftSnapshot[]>({
      queryKey: qk.subjects(),
      queryFn: () =>
        ludoGet<SubjectsDraftSnapshot[]>(adminApi.subjects.base, true),
      staleTime: 60_000,
    }),

  activeFeatures: () =>
    queryOptions<ActiveFeaturesResponse>({
      queryKey: qk.activeFeatures(),
      queryFn: () => ludoGet<ActiveFeaturesResponse>(adminApi.features.base),
      staleTime: Infinity,
    }),

  allCourses: () =>
    queryOptions({
      queryKey: qk.courses(),
      queryFn: () => ludoGet<LudoCourse[]>(adminApi.catalog.courses, true),
      staleTime: 60_000,
    }),
};
