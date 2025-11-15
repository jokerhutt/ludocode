import {
  RP_COURSE,
  RP_LESSON,
  RP_MODULE,
  RP_PROFILE,
  RP_BUILD,
  RP_MODULE_REDIRECT,
  RP_ME,
  RP_BUILD_SELECTION,
  RP_PLAYGROUND,
  RP_BUILD_REDIRECT,
  RP_BUILD_MODULE,
  RP_BUILD_MODULE_LESSON,
} from "../constants/routes.ts";
import type { HistoryState } from "@tanstack/react-router";
import type { LessonSubmission } from "../Types/Exercise/LessonSubmissionTypes.ts";
import {
  buildSelectionRoute,
  buildRoute,
  completeRoute,
  lessonRoute,
  playgroundRoute,
  projectRoute,
  streakIncreaseRoute,
  syncRoute,
} from "./router";

export const ludoNavigation = {
  courseRoot: () => ({ to: RP_COURSE }),

  me: () => ({ to: RP_ME }),

  build: {
    toSelectCourse: () => ({
      to: RP_BUILD_SELECTION,
    }),

    toBuilder: (courseId: string) => ({
      to: RP_BUILD,
      params: { courseId },
    }),

    toBuilderModule: (courseId: string, moduleId: string) => ({
      to: RP_BUILD,
      params: { courseId },
      search: { moduleId },
    }),

    toBuilderLesson: (
      courseId: string,
      moduleId: string,
      lessonId: string
    ) => ({
      to: RP_BUILD,
      params: { courseId },
      search: { moduleId, lessonId },
    }),
  },

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
      replace: true,
    }),
  },

  playground: {
    toPlayground: () => ({ to: RP_PLAYGROUND }),
    toProject: (projectId: string) => ({
      to: projectRoute.to,
      params: { projectId },
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
