import type { HistoryState } from "@tanstack/react-router";
import {
  RP_COURSE,
  RP_LESSON,
  RP_MODULE,
  RP_BUILD,
  RP_MODULE_REDIRECT,
  RP_ME,
  RP_BUILD_HUB,
  RP_PROJECT_HUB,
} from "../constants/router/routes.ts";
import {
  lessonPageRoute,
  projectRoute,
  completionRoute,
  syncRoute,
} from "./router";
import type { LessonSubmission } from "@/Types/Exercise/LessonSubmissionTypes.ts";

export const ludoNavigation = {
  courseRoot: () => ({ to: RP_COURSE }),

  me: () => ({ to: RP_ME }),

  build: {
    toSelectCourse: () => ({
      to: RP_BUILD_HUB,
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

    toBuilderExercise: (
      courseId: string,
      moduleId: string,
      lessonId: string,
      exerciseId: string
    ) => ({
      to: RP_BUILD,
      params: { courseId },
      search: { moduleId, lessonId, exerciseId },
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
      to: lessonPageRoute.to,
      params: { lessonId },
      search: { exercise: current + 1 },
      replace: true,
    }),
  },

  playground: {
    toPlayground: () => ({ to: RP_PROJECT_HUB }),
    toProject: (projectId: string) => ({
      to: projectRoute.to,
      params: { projectId },
    }),
  },

  completion: {
    toSyncPage: (lessonId: string, submission: LessonSubmission) => ({
      to: syncRoute.to,
      params: { lessonId },
      state: (prev: HistoryState) => ({ ...(prev ?? {}), submission }),
      replace: true,
    }),

    toLessonComplete: (
      courseId: string,
      lessonId: string,
      coins: number,
      accuracy: number,
      oldStreak: number,
      newStreak: number,
      completionStatus: string
    ) => ({
      to: completionRoute.to,
      params: { courseId, lessonId },
      search: {
        step: "lesson",
        coins,
        accuracy,
        oldStreak,
        newStreak,
        completionStatus,
      },
    }),

    toStreakIncrease: () => ({
      to: completionRoute.to,
      search: (prev: any) => ({
        ...prev,
        step: "streak",
      }),
    }),

    toCourseComplete: () => ({
      to: completionRoute.to,
      search: (prev: any) => ({
        ...prev,
        step: "course",
      }),
    }),
  },

  module: {
    toCurrent: (replace = false) => ({
      to: RP_MODULE_REDIRECT,
      replace: replace,
    }),
    toModule: (courseId: string, moduleId: string) => ({
      to: RP_MODULE,
      params: { courseId, moduleId },
    }),
  },
};
