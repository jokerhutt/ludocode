import { queryOptions } from "@tanstack/react-query";
import { qk } from "../../constants/qk";
import { fetchCourseProgress } from "./useCourseProgress";
import { fetchAllCourses } from "./useAllCourses";
import { lessonBatcher, moduleBatcher } from "./Batcher/batchers";
import { fetchCurrentUser } from "./useCurrentUser";
import { fetchFlatTree } from "./Tree/useFlatTree";
import type { LudoModule } from "../../Types/Catalog/LudoModule";
import type { LudoLesson } from "../../Types/Catalog/LudoLesson";

export const qo = {
  currentUser: () =>
    queryOptions({ queryKey: qk.currentUser(), queryFn: fetchCurrentUser, staleTime: 60_000 }),


  allCourses: () => queryOptions({ queryKey: qk.courses(), queryFn: () => fetchAllCourses()}),

  courseProgress: (courseId: string) =>
    queryOptions({ queryKey: qk.courseProgress(courseId), queryFn: () => fetchCourseProgress(courseId), staleTime: 60_000 }),

  courseTree: (courseId: string) =>
    queryOptions({ queryKey: qk.courseTree(courseId), queryFn: () => fetchFlatTree(courseId), staleTime: 5 * 60_000 }),

  lesson: (lessonId: string) =>
    queryOptions<LudoLesson>({queryKey: qk.lesson(lessonId), queryFn: () => lessonBatcher.fetch(lessonId), staleTime: 60_000}),

  module: (moduleId: string) =>
    queryOptions<LudoModule>({ queryKey: qk.module(moduleId), queryFn: () => moduleBatcher.fetch(moduleId), staleTime: 60_000 }),


};