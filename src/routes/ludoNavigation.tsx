import {
  RP_COURSE,
  RP_LESSON,
  RP_MODULE,
  RP_PROFILE,
  RP_BUILD,
  RP_MODULE_REDIRECT,
  RP_ME,
} from "../constants/routes.ts";
import type { HistoryState } from '@tanstack/react-router'
import type { LessonSubmission } from "../Types/Exercise/LessonSubmissionTypes.ts";
import {
  completeRoute,
  lessonRoute,
  streakIncreaseRoute,
  syncRoute,
} from "./router";

export const ludoNavigation = {
  //SIMPLE
  courseRoot: () => ({ to: RP_COURSE }),
  build: () => ({ to: RP_BUILD }),
  me: () => ({ to: RP_ME }),

  lesson: {
    start: (courseId: string, lessonId: string) =>
      ludoNavigation.lesson.toLesson(courseId, lessonId, 1),
    toLesson: (courseId: string, lessonId: string, exercise: number) => ({
      to: RP_LESSON,
      params: { courseId, lessonId },
      search: { exercise },
    }),
    toNextExercise: (lessonId: string, current: number) => ({
      to: lessonRoute.to,
      params: { lessonId },
      search: { exercise: current + 1 },
      replace: true,
    }),
    toSyncPage: (lessonId: string, submission: LessonSubmission) => ({
      to: syncRoute.to,
      params: { lessonId },
      state: (prev: HistoryState) => ({ ...(prev ?? {}), submission }),
      replace: true
    }),
  },

  completion: {
    toComplete: (
      coins: number,
      accuracy: number,
      oldStreak: number,
      newStreak: number
    ) => ({
      to: completeRoute.to,
      params: { coins, accuracy, oldStreak, newStreak },
    }),
    toStreakIncrease: (oldStreak: number, newStreak: number) => ({
      to: streakIncreaseRoute.to,
      params: { oldStreak, newStreak },
    }),
  },

  module: {
    toCurrent: () => ({ to: RP_MODULE_REDIRECT }),
    toModule: (courseId: string, moduleId: string) => ({
      to: RP_MODULE,
      params: { courseId, moduleId },
    }),
  },
};
