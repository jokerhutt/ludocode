import { queryOptions } from "@tanstack/react-query";
import { qk } from "@/hooks/Queries/Definitions/qk";
import { userBatcher } from "@/hooks/Queries/Definitions/batchers";
import type { CourseSnap, LudoCourse, LudoUser } from "@ludocode/types";
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

  allCourses: () =>
    queryOptions({
      queryKey: qk.courses(),
      queryFn: () => ludoGet<LudoCourse[]>(adminApi.catalog.courses, true),
      staleTime: 60_000,
    }),
};
