import type { HistoryState } from "@tanstack/react-router";
import { routes } from "../../constants/router/routes.ts";
import {
  lessonPageRoute,
  projectRoute,
  completionRoute,
  syncRoute,
  moduleHubRoute,
} from "../router.tsx";
import type { LessonSubmission } from "@/types/Exercise/LessonSubmissions.ts";

export const ludoNavigation = {
  auth: () => ({ to: routes.auth.authPage }),

  courseRoot: () => ({ to: routes.hub.courses }),

  hub: {
    module: {
      toModule: (courseId: string, moduleId: string) => ({
        to: moduleHubRoute.to,
        params: { courseId, moduleId },
        replace: true,
      }),
    },
    builder: {
      toBuilderHub: () => ({
        to: routes.hub.builder,
      }),
    },
    project: {
      toProjectHub: () => ({ to: routes.hub.project }),
    },
    profile: {
      toProfile: (userId: string) => ({
        to: routes.hub.profile.user,
        params: { userId },
        replace: true,
      }),
    },
  },

  builder: {
    toBuilder: (courseId: string) => ({
      to: routes.build.builderPage,
      params: { courseId },
    }),

    toBuilderModule: (courseId: string, moduleId: string) => ({
      to: routes.build.builderPage,
      params: { courseId },
      search: { moduleId },
    }),

    toBuilderLesson: (
      courseId: string,
      moduleId: string,
      lessonId: string
    ) => ({
      to: routes.build.builderPage,
      params: { courseId },
      search: { moduleId, lessonId },
    }),

    toBuilderExercise: (
      courseId: string,
      moduleId: string,
      lessonId: string,
      exerciseId: string
    ) => ({
      to: routes.build.builderPage,
      params: { courseId },
      search: { moduleId, lessonId, exerciseId },
    }),
  },

  lesson: {
    start: (courseId: string, moduleId: string, lessonId: string) =>
      ludoNavigation.lesson.toLesson(courseId, moduleId, lessonId, 1),
    toLesson: (
      courseId: string,
      moduleId: string,
      lessonId: string,
      exercise: number
    ) => ({
      to: routes.lesson.lessonPage,
      params: { courseId, moduleId, lessonId },
      search: { exercise },
    }),
    toNextExercise: (lessonId: string, current: number) => ({
      to: lessonPageRoute.to,
      params: { lessonId },
      search: { exercise: current + 1 },
      replace: true,
    }),
  },

  project: {
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
      moduleId: string,
      lessonId: string,
      coins: number,
      accuracy: number,
      oldStreak: number,
      newStreak: number,
      completionStatus: string
    ) => ({
      to: completionRoute.to,
      params: { courseId, moduleId, lessonId },
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
};
