import type { HistoryState } from "@tanstack/react-router";

// AUTH
import { Route as authLoginRoute } from "@/routes/auth/login";
import { Route as authRegisterRoute } from "@/routes/auth/register";

// HUB PAGES
import { Route as coursesRoute } from "@/routes/_app/_hub/courses.tsx";
import { Route as projectHubRoute } from "@/routes/_app/_hub/projects.tsx";

import { Route as moduleHubRoute } from "@/routes/_app/_hub/learn/$courseId/$moduleId.tsx";
import { Route as profileRoute } from "@/routes/_app/_hub/profile/$userId/index.tsx";
import { Route as accountSettingsRoute } from "@/routes/_app/_hub/profile/$userId/settings.tsx";

// LESSON PAGE
import { Route as lessonPageRoute } from "@/routes/_app/lesson/$courseId/$moduleId/$lessonId";

// DESKTOP-GUARD GROUP
import { Route as projectPageRoute } from "@/routes/_app/_desktopguard/project/$projectId.tsx";

// SUBSCRIPTION
import { Route as subscriptionComparisonRoute } from "@/routes/_app/subscription/_subscribedguard/comparison";
import { Route as subscriptionConfirmedRoute } from "@/routes/_app/subscription/confirm";
import { Route as alreadySubscribedRoute } from "@/routes/_app/subscription/already-subscribed";

// SYNC + COMPLETION
import { Route as syncRoute } from "@/routes/_app/sync/$lessonId.tsx";
import { Route as completionRoute } from "@/routes/_app/completion/$courseId/$moduleId/$lessonId.tsx";

// ONBOARDING
import { Route as onboardingStageRoute } from "@/routes/_app/onboarding.$stage.tsx";

// LEADERBOARD
import { Route as leaderboardHubRoute } from "@/routes/_app/_hub/leaderboard";

// APP

import { Route as appIndexRoute } from "@/routes/_app/index";

// RESOURCES

import { Route as resourcesRootRoute } from "@/routes/resources/route";
import { Route as tosRoute } from "@/routes/resources/legal/tos";
import { Route as privacyRoute } from "@/routes/resources/legal/privacy";
import { Route as docsRoute } from "@/routes/resources/docs/index";

import type { LessonSubmissionRequest, StageKey } from "@ludocode/types";

export const ludoNavigation = {
  auth: {
    login: () => ({ to: authLoginRoute.to, replace: true }),
    register: () => ({ to: authRegisterRoute.to, replace: true }),
  },

  app: {
    index: () => ({ to: appIndexRoute.to }),
  },

  courseRoot: () => ({ to: coursesRoute.to }),

  hub: {
    module: {
      toModule: (courseId: string, moduleId: string, replace?: boolean) => ({
        to: moduleHubRoute.to,
        params: { courseId, moduleId },
        replace: replace,
      }),
    },
    project: {
      toProjectHub: () => ({ to: projectHubRoute.to }),
    },
    leaderboard: {
      toLeaderboardHub: () => ({ to: leaderboardHubRoute.to }),
    },
    profile: {
      toProfile: (userId: string, replace?: boolean) => ({
        to: profileRoute.to,
        params: { userId },
        replace: replace,
      }),
      toSettings: (userId: string) => ({
        to: accountSettingsRoute.to,
        params: { userId },
      }),
      toDocs: () => ({
        to: docsRoute.to,
      }),
    },
  },

  resources: {
    toResourcesRoute: () => ({ to: resourcesRootRoute.to }),
    toToS: () => ({ to: tosRoute.to }),
    toPrivacy: () => ({ to: privacyRoute.to }),
    toDocs: () => ({ to: docsRoute.to }),
  },

  lesson: {
    start: (courseId: string, moduleId: string, lessonId: string) =>
      ludoNavigation.lesson.toLesson(courseId, moduleId, lessonId, 1),
    toLesson: (
      courseId: string,
      moduleId: string,
      lessonId: string,
      exercise: number,
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
      params: { stage: "name" as StageKey },
      replace: true,
    }),
  },

  subscription: {
    toSubscriptionComparisonPage: () => ({
      to: subscriptionComparisonRoute.to,
    }),
    toSubscriptionConfirmedPage: () => ({
      to: subscriptionConfirmedRoute.to,
    }),
    toAlreadySubscribedPage: () => ({
      to: alreadySubscribedRoute.to,
      replace: true,
    }),
  },

  completion: {
    toSyncPage: (lessonId: string, submission: LessonSubmissionRequest) => ({
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
      completionStatus: string,
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
      lessonId: string,
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
      lessonId: string,
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
