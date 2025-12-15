import type { HistoryState } from "@tanstack/react-router";

import type { LessonSubmission } from "@/types/Exercise/LessonSubmissions.ts";

// AUTH
import { Route as authRoute } from "@/routes/auth";

// HUB PAGES
import { Route as coursesRoute } from "@/routes/_app/_hub/courses";
import { Route as builderHubRoute } from "@/routes/_app/_hub/builder";
import { Route as projectHubRoute } from "@/routes/_app/_hub/projects";

import { Route as moduleHubRoute } from "@/routes/_app/_hub/learn/$courseId/$moduleId";
import { Route as profileRoute } from "@/routes/_app/_hub/profile/$userId";

// LESSON PAGE
import { Route as lessonPageRoute } from "@/routes/_app/lesson/$courseId/$moduleId/$lessonId";

// DESKTOP-GUARD GROUP
import { Route as builderPageRoute } from "@/routes/_app/_desktopguard/build/$courseId.tsx";
import { Route as projectPageRoute } from "@/routes/_app/_desktopguard/project/$projectId.tsx";

// SYNC + COMPLETION
import { Route as syncRoute } from "@/routes/_app/sync/$lessonId.tsx";
import { Route as completionRoute } from "@/routes/_app/completion/$courseId/$moduleId/$lessonId.tsx";

// ONBOARDING
import { Route as onboardingStageRoute } from "@/routes/_app/onboarding.$stage";
import type { StageKey } from "@/types/Onboarding/OnboardingSteps.ts";

export const ludoNavigation = {
  auth: () => ({ to: authRoute.to }),

  courseRoot: () => ({ to: coursesRoute.to }),

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
        to: builderHubRoute.to,
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

  builder: {
    toBuilder: (courseId: string) => ({
      to: builderPageRoute.to,
      params: {
        courseId,
      },
      search: {
        moduleId: undefined,
        lessonId: undefined,
        exerciseId: undefined,
      },
    }),

    toBuilderModule: (courseId: string, moduleId: string) => ({
      to: builderPageRoute.to,
      params: { courseId },
      search: { moduleId, lessonId: undefined, exerciseId: undefined },
    }),

    toBuilderLesson: (
      courseId: string,
      moduleId: string,
      lessonId: string
    ) => ({
      to: builderPageRoute.to,
      params: { courseId },
      search: { moduleId, lessonId, exerciseId: undefined },
    }),

    toBuilderExercise: (
      courseId: string,
      moduleId: string,
      lessonId: string,
      exerciseId: string
    ) => ({
      to: builderPageRoute.to,
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
      params: { stage: "careers" as StageKey },
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
