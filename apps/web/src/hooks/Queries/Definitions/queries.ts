import { queryOptions } from "@tanstack/react-query";
import { qk } from "./qk.ts";
import {
  courseProgressBatcher,
  lessonBatcher,
  moduleBatcher,
  userBatcher,
  userCoinsBatcher,
} from "../Batcher/batchers.ts";
import type { LudoModule } from "../../../../../../packages/types/Catalog/LudoModule.ts";
import type { LudoLesson } from "../../../../../../packages/types/Catalog/LudoLesson.ts";
import type { CourseProgress } from "../../../../../../packages/types/User/CourseProgress.ts";
import type { LudoExercise } from "../../../../../../packages/types/Exercise/LudoExercise.ts";
import { ludoGet } from "../Fetcher/ludoGet.ts";
import type { LudoCourse } from "../../../../../../packages/types/Catalog/LudoCourse.ts";
import {
  AUTH_ME,
  GET_ALL_COURSES,
  GET_COURSE_TREE,
  GET_CURRENT_COURSE_ID,
  GET_ENROLLED_IDS,
  GET_EXERCISES_FROM_LESSON,
  GET_USER_PREFERENCES,
  GET_MY_PROJECTS,
  GET_USER_STREAK,
  GET_PAST_WEEK_STREAK,
  GET_ENABLED_FEATURES,
  GET_USER_CREDITS,
} from "../../../constants/api/pathConstants.ts";
import type { LudoUser } from "../../../../../../packages/types/User/LudoUser.ts";
import type { FlatCourseTree } from "../../../../../../packages/types/Catalog/FlatCourseTree.ts";
import type { UserPreferences } from "../../../../../../packages/types/User/UserPreferences.ts";
import type { ProjectListResponse } from "../../../../../../packages/types/Project/ProjectListResponse.ts";
import {
  type DailyGoalMet,
  type UserStreak,
} from "../../../../../../packages/types/User/UserStreak.ts";
import { type ActiveFeaturesResponse } from "../../../../../../packages/types/FeatureFlags/FeatureFlags.ts";

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

  credits: () =>
    queryOptions<number>({
      queryKey: qk.credits(),
      queryFn: () => ludoGet<number>(GET_USER_CREDITS, true),
      staleTime: 60_000,
    }),

  streakPastWeek: () =>
    queryOptions<DailyGoalMet[]>({
      queryKey: qk.streakPastWeek(),
      queryFn: () => ludoGet<DailyGoalMet[]>(GET_PAST_WEEK_STREAK, true),
      staleTime: 60_000,
    }),

  streak: (userId: string) =>
    queryOptions<UserStreak>({
      queryKey: qk.streak(userId),
      queryFn: () => ludoGet<UserStreak>(GET_USER_STREAK, true),
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

  allCourses: () =>
    queryOptions({
      queryKey: qk.courses(),
      queryFn: () => ludoGet<LudoCourse[]>(GET_ALL_COURSES),
      staleTime: 60_000,
    }),

  allProjects: () =>
    queryOptions({
      queryKey: qk.projects(),
      queryFn: () => ludoGet<ProjectListResponse>(GET_MY_PROJECTS, true),
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
