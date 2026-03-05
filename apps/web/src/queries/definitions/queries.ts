import { queryOptions } from "@tanstack/react-query";
import { qk } from "@/queries/definitions/qk.ts";
import {
  courseProgressBatcher,
  courseStatsBatcher,
  lessonBatcher,
  moduleBatcher,
  userBatcher,
  userCoinsBatcher,
} from "@/queries/definitions/batchers.ts";
import type { LudoModule } from "@ludocode/types/Catalog/LudoModule.ts";
import type { LudoLesson } from "@ludocode/types/Catalog/LudoLesson.ts";
import type { CourseProgress } from "@ludocode/types/User/CourseProgress.ts";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import { ludoGet } from "@ludocode/api/fetcher.ts";
import type { LudoCourse } from "@ludocode/types/Catalog/LudoCourse.ts";
import type { LudoUser } from "@ludocode/types/User/LudoUser.ts";
import type { FlatCourseTree } from "@ludocode/types/Catalog/FlatCourseTree.ts";
import type { UserPreferences } from "@ludocode/types/User/UserPreferences.ts";
import type { ProjectListResponse } from "@ludocode/types/Project/ProjectListResponse.ts";
import {
  type DailyGoalMet,
  type UserStreak,
} from "@ludocode/types/User/UserStreak.ts";
import { type ActiveFeaturesResponse } from "@ludocode/types/FeatureFlags/FeatureFlags.ts";
import { api } from "@/constants/api/api.ts";
import {
  type LudoCareer,
  type CourseStats,
  type LanguageMetadata,
  type PlanOverview,
  type UserSubscription,
} from "@ludocode/types";

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

  courseStats: (courseId: string) =>
    queryOptions<CourseStats>({
      queryKey: qk.courseStats(courseId),
      queryFn: () => courseStatsBatcher.fetch(courseId),
      staleTime: 60_000,
    }),

  preferences: () =>
    queryOptions<UserPreferences>({
      queryKey: qk.preferences(),
      queryFn: () => ludoGet<UserPreferences>(api.preferences.base, true),
      staleTime: 60_000,
    }),

  activeFeatures: () =>
    queryOptions<ActiveFeaturesResponse>({
      queryKey: qk.activeFeatures(),
      queryFn: () => ludoGet<ActiveFeaturesResponse>(api.features.base),
      staleTime: Infinity,
    }),

  lesson: (lessonId: string) =>
    queryOptions<LudoLesson>({
      queryKey: qk.lesson(lessonId),
      queryFn: () => lessonBatcher.fetch(lessonId),
      staleTime: 60_000,
    }),

  languages: () =>
    queryOptions<LanguageMetadata[]>({
      queryKey: qk.languages(),
      queryFn: () => ludoGet<LanguageMetadata[]>(api.languages.base, true),
      staleTime: 60_00,
    }),

  credits: () =>
    queryOptions<number>({
      queryKey: qk.credits(),
      queryFn: () => ludoGet<number>(api.credits.base, true),
      staleTime: 60_000,
    }),

  streakPastWeek: () =>
    queryOptions<DailyGoalMet[]>({
      queryKey: qk.streakPastWeek(),
      queryFn: () => ludoGet<DailyGoalMet[]>(api.progress.streak.weekly, true),
      staleTime: 60_000,
    }),

  streak: (userId: string) =>
    queryOptions<UserStreak>({
      queryKey: qk.streak(userId),
      queryFn: () => ludoGet<UserStreak>(api.progress.streak.base, true),
      staleTime: 60_000,
    }),

  subscription: () =>
    queryOptions<UserSubscription>({
      queryKey: qk.subscription(),
      queryFn: () => ludoGet<UserSubscription>(api.subscriptions.base, true),
      staleTime: 60_000,
    }),

  plans: () =>
    queryOptions<PlanOverview[]>({
      queryKey: qk.plans(),
      queryFn: () => ludoGet<PlanOverview[]>(api.subscriptions.plans, true),
      staleTime: 60_000,
    }),

  currentCourseId: () =>
    queryOptions<string>({
      queryKey: qk.currentCourseId(),
      queryFn: () => ludoGet<string>(api.progress.courses.current, true),
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
      queryFn: () => ludoGet<LudoUser>(api.auth.me, true),
      staleTime: 60_000,
      retry: false,
    }),

  allCourses: () =>
    queryOptions({
      queryKey: qk.courses(),
      queryFn: () => ludoGet<LudoCourse[]>(api.catalog.courses),
      staleTime: 60_000,
    }),

  allCareers: () =>
    queryOptions({
      queryKey: qk.careers(),
      queryFn: () => ludoGet<LudoCareer[]>(api.preferences.careers),
      staleTime: 60_000
    }),

  allProjects: () =>
    queryOptions({
      queryKey: qk.projects(),
      queryFn: () => ludoGet<ProjectListResponse>(api.projects.base, true),
      staleTime: 60_000,
    }),

  coins: (userId: string) =>
    queryOptions({
      queryKey: qk.userCoins(userId),
      queryFn: () => userCoinsBatcher.fetch(userId),
      staleTime: 60_000,
    }),

  enrolled: () =>
    queryOptions({
      queryKey: qk.enrolled(),
      queryFn: () => ludoGet<string[]>(api.progress.courses.enrolled, true),
      staleTime: 60_000,
    }),

  exercises: (lessonId: string) =>
    queryOptions<LudoExercise[]>({
      queryKey: qk.exercises(lessonId),
      queryFn: () =>
        ludoGet<LudoExercise[]>(api.lessons.lessonExercises(lessonId)),
      staleTime: 60_000,
    }),

  courseTree: (courseId: string) =>
    queryOptions({
      queryKey: qk.courseTree(courseId),
      queryFn: () =>
        ludoGet<FlatCourseTree>(api.catalog.courseTree(courseId), true),
      staleTime: 5 * 60_000,
    }),
};
