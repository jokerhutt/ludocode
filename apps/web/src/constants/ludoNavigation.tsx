import type { HistoryState } from "@tanstack/react-router";

// AUTH
import { Route as authLoginRoute } from "@/routes/auth/login";
import { Route as authRegisterRoute } from "@/routes/auth/register";

// HUB PAGES
import { Route as coursesRoute } from "@/routes/_app/_hub/courses.tsx";
import { Route as projectHubRoute } from "@/routes/_app/_hub/projects.tsx";

import { Route as moduleHubRoute } from "@/routes/_app/_hub/learn/$courseId/$moduleId.tsx";
import { Route as profileRoute } from "@/routes/_app/_hub/profile/$userId.tsx";

// LESSON PAGE
import { Route as lessonPageRoute } from "@/routes/_app/lesson/$courseId/$moduleId/$lessonId";

// DESKTOP-GUARD GROUP
import { Route as projectPageRoute } from "@/routes/_app/_desktopguard/project/$projectId.tsx";

// SYNC + COMPLETION
import { Route as syncRoute } from "@/routes/_app/sync/$lessonId.tsx";
import { Route as completionRoute } from "@/routes/_app/completion/$courseId/$moduleId/$lessonId.tsx";

// ONBOARDING
import { Route as onboardingStageRoute } from "@/routes/_app/onboarding.$stage.tsx";
import type { StageKey } from "@/features/Onboarding/Templates/OnboardingSteps.ts";
import type { LessonSubmission } from "@ludocode/types";

export const ludoNavigation = {
  auth: {
    login: () => ({ to: authLoginRoute.to }),
    register: () => ({ to: authRegisterRoute.to }),
  },

  courseRoot: () => ({ to: coursesRoute.to }),

  hub: {
    module: {
      toModule: (courseId: string, moduleId: string) => ({
        to: moduleHubRoute.to,
        params: { courseId, moduleId },
        replace: true,
      }),
    },
    project: {
      toProjectHub: () => ({ to: projectHubRoute.to }),
    },
    profile: {
      toProfile: (userId: string) => ({
        to: profileRoute.to,
        params: { userId },
        replace: true,
      }),
    },
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
      to: lessonPageRoute.to,
      params: { courseId, moduleId, lessonId },
      search: { exercise },
    }),
    toNextExercise: (current: number) => ({
      to: lessonPageRoute.to,
      params: (prev: any) => prev,
      search: (prev: any) => ({
        ...prev,
        exercise: current + 1,
      }),
      replace: true,
    }),
  },

  project: {
    toProject: (projectId: string) => ({
      to: projectPageRoute.to,
      params: { projectId },
    }),
  },

  onboarding: {
    start: () => ({
      to: onboardingStageRoute.to,
      params: { stage: "career" as StageKey },
      replace: true,
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
        step: "lesson" as const,
        coins,
        accuracy,
        oldStreak,
        newStreak,
        completionStatus,
      },
    }),

    toStreakIncrease: (
      courseId: string,
      moduleId: string,
      lessonId: string
    ) => ({
      to: completionRoute.to,
      params: { courseId, moduleId, lessonId },
      search: (prev: any) => ({
        ...prev,
        step: "streak" as const,
      }),
    }),

    toCourseComplete: (
      courseId: string,
      moduleId: string,
      lessonId: string
    ) => ({
      to: completionRoute.to,
      params: { courseId, moduleId, lessonId },
      search: (prev: any) => ({
        ...prev,
        step: "course",
      }),
    }),
  },
};
