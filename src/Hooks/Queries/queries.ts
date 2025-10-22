import { queryOptions } from "@tanstack/react-query";
import { qk } from "../../constants/qk";
import { fetchAllCourses } from "./useAllCourses";
import {
  courseProgressBatcher,
  lessonBatcher,
  moduleBatcher,
  userBatcher,
} from "./Batcher/batchers";
import { fetchCurrentUser } from "./useCurrentUser";
import { fetchFlatTree } from "./Tree/useFlatTree";
import type { LudoModule } from "../../Types/Catalog/LudoModule";
import type { LudoLesson } from "../../Types/Catalog/LudoLesson";

export const qo = {
  currentUser: () =>
    queryOptions({
      queryKey: qk.currentUser(),
      queryFn: fetchCurrentUser,
      staleTime: 60_000,
    }),

  user: (userId: string) =>
    queryOptions({
      queryKey: qk.user(userId),
      queryFn: () => userBatcher.fetch(userId),
      staleTime: 60_00,
    }),

  allCourses: () =>
    queryOptions({
      queryKey: qk.courses(),
      queryFn: () => fetchAllCourses(),
      staleTime: 60_000,
    }),

  courseProgress: (courseId: string) =>
    queryOptions({
      queryKey: qk.courseProgress(courseId),
      queryFn: () => courseProgressBatcher.fetch(courseId),
      staleTime: 60_000,
    }),

  courseTree: (courseId: string) =>
    queryOptions({
      queryKey: qk.courseTree(courseId),
      queryFn: () => fetchFlatTree(courseId),
      staleTime: 5 * 60_000,
    }),

  lesson: (lessonId: string) =>
    queryOptions<LudoLesson>({
      queryKey: qk.lesson(lessonId),
      queryFn: () => lessonBatcher.fetch(lessonId),
      staleTime: 60_000,
    }),

  module: (moduleId: string) =>
    queryOptions<LudoModule>({
      queryKey: qk.module(moduleId),
      queryFn: () => moduleBatcher.fetch(moduleId),
      staleTime: 60_000,
    }),
};
