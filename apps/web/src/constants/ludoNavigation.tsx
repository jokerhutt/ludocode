import type { HistoryState } from "@tanstack/react-router";

// AUTH
import { Route as authLoginRoute } from "@/routes/auth/login";
import { Route as authRegisterRoute } from "@/routes/auth/register";

// HUB PAGES
import { Route as coursesRoute } from "@/routes/app/_hub/courses.tsx";
import { Route as projectHubRoute } from "@/routes/app/_hub/projects.tsx";

import { Route as moduleHubRoute } from "@/routes/app/_hub/learn/$courseId/$moduleId.tsx";
import { Route as profileRoute } from "@/routes/app/_hub/profile/$userId/index.tsx";
import { Route as accountSettingsRoute } from "@/routes/app/_hub/profile/$userId/settings.tsx";
import {Route as avatarRoute} from "@/routes/app/_hub/profile/$userId/avatar.tsx"

// LESSON PAGE
import { Route as lessonPageRoute } from "@/routes/app/lesson/$courseId/$moduleId/$lessonId";

import { Route as projectPageRoute } from "@/routes/project/$authorId/$projectId";

// SUBSCRIPTION
import { Route as subscriptionComparisonRoute } from "@/routes/app/subscription/_subscribedguard/comparison";
import { Route as subscriptionConfirmedRoute } from "@/routes/app/subscription/confirm";
import { Route as alreadySubscribedRoute } from "@/routes/app/subscription/already-subscribed";

// SYNC + COMPLETION
import { Route as syncRoute } from "@/routes/app/sync/$lessonId.tsx";
import { Route as completionRoute } from "@/routes/app/completion/$courseId/$moduleId/$lessonId.tsx";

// ONBOARDING
import { Route as onboardingStageRoute } from "@/routes/app/onboarding.$stage.tsx";

// COMMUNITY

import { Route as communityHubRoute } from "@/routes/app/_hub/community/index";

// LEADERBOARD
import { Route as leaderboardHubRoute } from "@/routes/app/_hub/leaderboard";

// APP

import { Route as appIndexRoute } from "@/routes/app/index";

// RESOURCES

import { Route as resourcesRootRoute } from "@/routes/_resources/route";
import { Route as tosRoute } from "@/routes/_resources/legal/tos";
import { Route as privacyRoute } from "@/routes/_resources/legal/privacy";
import { Route as docsRoute } from "@/routes/_resources/docs/index";

import type { LessonSubmissionRequest, StageKey } from "@ludocode/types";

export const ludoNavigation = {
  auth: {
    login: (replace = true) => ({ to: authLoginRoute.to, replace: replace }),
    register: (replace = true) => ({
      to: authRegisterRoute.to,
      replace: replace,
    }),
    guest: (replace = true) => ({ to: "/auth/guest", replace: replace }),
  },

  app: {
    index: () => ({ to: appIndexRoute.to }),
  },

  courseRoot: () => ({ to: coursesRoute.to }),

  hub: {
    community: {
      toCommunityHub: () => ({ to: communityHubRoute.to }),
    },
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
      toAvatar: (userId: string) => ({
        to: avatarRoute.to,
        params: {userId}
      }),
      toDocs: (slug?: string) => ({
        to: docsRoute.to,
        search: slug ? { slug } : undefined,
      }),
    },
  },

  resources: {
    toResourcesRoute: () => ({ to: resourcesRootRoute.to }),
    toToS: () => ({ to: tosRoute.to }),
    toPrivacy: () => ({ to: privacyRoute.to }),
    toDocs: (slug?: string) => ({
      to: docsRoute.to,
      search: slug ? { slug } : undefined,
    }),
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
    toPreviousExercise: (current: number) => ({
      to: lessonPageRoute.to,
      params: (prev: any) => prev,
      search: (prev: any) => ({
        ...prev,
        exercise: Math.max(1, current - 1),
      }),
      replace: true,
    }),
  },

  project: {
    toProject: (authorId: string, projectId: string) => ({
      to: projectPageRoute.to,
      params: { authorId, projectId },
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
      xpGained: number,
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
        xpGained,
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
