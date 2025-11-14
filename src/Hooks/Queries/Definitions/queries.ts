import { queryOptions } from "@tanstack/react-query";
import { qk } from "../../../constants/qk";
import {
  courseProgressBatcher,
  lessonBatcher,
  moduleBatcher,
  userBatcher,
  userStatsBatcher,
} from "../Batcher/batchers";

import type { LudoModule } from "../../../Types/Catalog/LudoModule";
import type { LudoLesson } from "../../../Types/Catalog/LudoLesson";
import type { CourseProgress } from "../../../Types/Progress/CourseProgress";
import type { LudoExercise } from "../../../Types/Exercise/LudoExercise";
import { ludoGet } from "../Fetcher/ludoGet";
import type { LudoCourse } from "../../../Types/Catalog/LudoCourse";
import {
  AUTH_ME,
  GET_ALL_COURSES,
  GET_COURSE_SNAPSHOT,
  GET_COURSE_TREE,
  GET_CURRENT_COURSE_ID,
  GET_ENROLLED_IDS,
  GET_EXERCISES_FROM_LESSON,
  GET_USER_PREFERENCES,
  GET_USER_PROJECTS,
} from "../../../constants/pathConstants.ts";
import type { LudoUser } from "../../../Types/User/LudoUser";
import type { FlatCourseTree } from "../../../Types/Catalog/FlatCourseTree";
import type { CourseSnap } from "../../../Types/Snapshot/SnapshotTypes.ts";
import type { UserPreferences } from "@/Types/User/UserPreferences.ts";
import type { ProjectSnapshot } from "@/Types/Playground/ProjectSnapshot.ts";

export const qo = {
  user: (userId: string) =>
    queryOptions({
      queryKey: qk.user(userId),
      queryFn: () => userBatcher.fetch(userId),
      staleTime: 60_00,
    }),

  courseProgress: (courseId: string) =>
    queryOptions<CourseProgress>({
      queryKey: qk.courseProgress(courseId),
      queryFn: () => courseProgressBatcher.fetch(courseId),
      staleTime: 60_000,
    }),

  preferences: () =>
    queryOptions<UserPreferences>({
      queryKey: qk.preferences(),
      queryFn: () => ludoGet<UserPreferences>(GET_USER_PREFERENCES, true),
      staleTime: 60_000,
    }),

  lesson: (lessonId: string) =>
    queryOptions<LudoLesson>({
      queryKey: qk.lesson(lessonId),
      queryFn: () => lessonBatcher.fetch(lessonId),
      staleTime: 60_000,
    }),

  currentCourseId: () =>
    queryOptions<string>({
      queryKey: qk.currentCourseId(),
      queryFn: () => ludoGet<string>(GET_CURRENT_COURSE_ID, true),
      staleTime: 60_000,
      retry: false,
    }),

  module: (moduleId: string) =>
    queryOptions<LudoModule>({
      queryKey: qk.module(moduleId),
      queryFn: () => moduleBatcher.fetch(moduleId),
      staleTime: 60_000,
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
      queryFn: () => ludoGet<CourseSnap>(GET_COURSE_SNAPSHOT(courseId)),
      staleTime: 60_000 * 10,
    }),

  allCourses: () =>
    queryOptions({
      queryKey: qk.courses(),
      queryFn: () => ludoGet<LudoCourse[]>(GET_ALL_COURSES),
      staleTime: 60_000,
    }),
  
  allProjects: () =>
    queryOptions({
      queryKey: qk.projects(),
      queryFn: () => ludoGet<ProjectSnapshot[]>(GET_USER_PROJECTS, true),
      staleTime: 60_000
    }),

  stats: (userId: string) =>
    queryOptions({
      queryKey: qk.userStats(userId),
      queryFn: () => userStatsBatcher.fetch(userId),
      staleTime: 60_000,
    }),

  enrolled: () =>
    queryOptions({
      queryKey: qk.enrolled(),
      queryFn: () => ludoGet<string[]>(GET_ENROLLED_IDS, true),
      staleTime: 60_000,
    }),

  exercises: (lessonId: string) =>
    queryOptions<LudoExercise[]>({
      queryKey: qk.exercises(lessonId),
      queryFn: () =>
        ludoGet<LudoExercise[]>(GET_EXERCISES_FROM_LESSON(lessonId)),
      staleTime: 60_000,
    }),

  courseTree: (courseId: string) =>
    queryOptions({
      queryKey: qk.courseTree(courseId),
      queryFn: () => ludoGet<FlatCourseTree>(GET_COURSE_TREE(courseId), true),
      staleTime: 5 * 60_000,
    }),
};
