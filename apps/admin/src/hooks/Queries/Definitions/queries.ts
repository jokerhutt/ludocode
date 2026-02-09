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

  runtimes: () =>
    queryOptions({
      queryKey: qk.runtimes(),
      queryFn: () => ludoGet<PistonRuntime[]>(adminApi.external.piston.runtimes, false),
      staleTime: 60_000 * 10,
    }),

  languages: () =>
    queryOptions<LanguageMetadata[]>({
      queryKey: qk.languages(),
      queryFn: () => ludoGet<LanguageMetadata[]>(adminApi.languages.base, true),
      staleTime: 60_00,
    }),

  allSubjects: () =>
    queryOptions<LudoCourseSubject[]>({
      queryKey: qk.subjects(),
      queryFn: () => ludoGet<LudoCourseSubject[]>(adminApi.subjects.base, true),
      staleTime: 60_000
    }),

  allCourses: () =>
    queryOptions({
      queryKey: qk.courses(),
      queryFn: () => ludoGet<LudoCourse[]>(adminApi.catalog.courses, true),
      staleTime: 60_000,
    }),
};
