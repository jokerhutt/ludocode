import { queryOptions } from "@tanstack/react-query";
import { qk } from "@/hooks/Queries/Definitions/qk";
import { userBatcher } from "@/hooks/Queries/Batcher/batchers";
import {
  AUTH_ME,
  COURSES,
  SNAPSHOT_BY_COURSE,
} from "@/constants/api/pathConstants";
import type { CourseSnap, LudoCourse, LudoUser } from "@ludocode/types";
import { ludoGet } from "@/hooks/Queries/Fetcher/ludoGet";

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
      queryFn: () => ludoGet<LudoUser>(AUTH_ME, true),
      staleTime: 60_000,
      retry: false,
    }),

  courseSnapshot: (courseId: string) =>
    queryOptions({
      queryKey: qk.courseSnapshot(courseId),
      queryFn: () => ludoGet<CourseSnap>(SNAPSHOT_BY_COURSE(courseId)),
      staleTime: 60_000 * 10,
    }),

  allCourses: () =>
    queryOptions({
      queryKey: qk.courses(),
      queryFn: () => ludoGet<LudoCourse[]>(COURSES),
      staleTime: 60_000,
    }),
};
