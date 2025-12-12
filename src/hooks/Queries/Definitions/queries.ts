import { queryOptions } from "@tanstack/react-query";
import { qk } from "./qk.ts";
import { lessonBatcher, moduleBatcher, userBatcher } from "../Batcher/batchers";
import type { LudoModule } from "@/types/Catalog/LudoModule";
import type { LudoLesson } from "@/types/Catalog/LudoLesson";
import type { CourseProgress } from "@/types/User/CourseProgress.ts";
import type { LudoExercise } from "@/types/Exercise/LudoExercise";
import {
  getAllCoursesFn,
  getCourseProgressServer,
  getCourseSnapshotFn,
  getCourseTreeFn,
  getCurrentCourseIdFn,
  getCurrentUserFn,
  getExercisesFromLessonFn,
  getProjectsFn,
  getUserCoinsFn,
  getUserEnrolledFn,
  getUserStreakFn,
  getUserWeeklyStreakFn,
} from "../../../routes/utils/-serverFn.ts";
import {
  GET_USER_PREFERENCES,
  GET_ENABLED_FEATURES,
} from "../../../constants/api/pathConstants.ts";
import type { UserPreferences } from "@/types/User/UserPreferences.ts";
import { type DailyGoalMet, type UserStreak } from "@/types/User/UserStreak.ts";
import { type ActiveFeaturesResponse } from "@/types/FeatureFlags/FeatureFlags.ts";
import { type UserCoins } from "@/types/User/UserCoins.ts";
import { ludoGet } from "../Fetcher/ludoGet.ts";

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
      queryFn: () => getCourseProgressServer({ data: courseId }),
      staleTime: 60_000,
    }),

  preferences: () =>
    queryOptions<UserPreferences>({
      queryKey: qk.preferences(),
      queryFn: () => ludoGet<UserPreferences>(GET_USER_PREFERENCES, true),
      staleTime: 60_000,
    }),

  activeFeatures: () =>
    queryOptions<ActiveFeaturesResponse>({
      queryKey: qk.activeFeatures(),
      queryFn: () => ludoGet<ActiveFeaturesResponse>(GET_ENABLED_FEATURES),
      staleTime: Infinity,
    }),

  lesson: (lessonId: string) =>
    queryOptions<LudoLesson>({
      queryKey: qk.lesson(lessonId),
      queryFn: () => lessonBatcher.fetch(lessonId),
      staleTime: 60_000,
    }),

  streakPastWeek: () =>
    queryOptions<DailyGoalMet[]>({
      queryKey: qk.streakPastWeek(),
      queryFn: () => getUserWeeklyStreakFn(),
      staleTime: 60_000,
    }),

  streak: (userId: string) =>
    queryOptions<UserStreak>({
      queryKey: qk.streak(userId),
      queryFn: () => getUserStreakFn(),
      staleTime: 60_000,
    }),

  currentCourseId: () =>
    queryOptions<string>({
      queryKey: qk.currentCourseId(),
      queryFn: () => getCurrentCourseIdFn(),
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
      queryFn: () => getCurrentUserFn(),
      staleTime: 60_000,
      retry: false,
    }),

  courseSnapshot: (courseId: string) =>
    queryOptions({
      queryKey: qk.courseSnapshot(courseId),
      queryFn: () => getCourseSnapshotFn({ data: courseId }),
      staleTime: 60_000 * 10,
    }),

  allCourses: () =>
    queryOptions({
      queryKey: qk.courses(),
      queryFn: () => getAllCoursesFn(),
      staleTime: 60_000,
    }),

  allProjects: () =>
    queryOptions({
      queryKey: qk.projects(),
      queryFn: () => getProjectsFn(),
      staleTime: 60_000,
    }),

  coins: (userId: string) =>
    queryOptions<UserCoins>({
      queryKey: qk.userCoins(userId),
      queryFn: () => getUserCoinsFn({ data: userId }),
      staleTime: 60_000,
    }),

  enrolled: () =>
    queryOptions({
      queryKey: qk.enrolled(),
      queryFn: () => getUserEnrolledFn(),
      staleTime: 60_000,
    }),

  exercises: (lessonId: string) =>
    queryOptions<LudoExercise[]>({
      queryKey: qk.exercises(lessonId),
      queryFn: () => getExercisesFromLessonFn({ data: lessonId }),
      staleTime: 60_000,
    }),

  courseTree: (courseId: string) =>
    queryOptions({
      queryKey: qk.courseTree(courseId),
      queryFn: () => getCourseTreeFn({ data: courseId }),
      staleTime: 5 * 60_000,
    }),
};
