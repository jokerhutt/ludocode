import {
  createRouter,
  createRoute,
  createRootRoute,
  redirect,
} from "@tanstack/react-router";
import { CoursePage } from "../features/Courses/CoursePage";
import { ModuleLayout } from "../Layouts/ModuleLayout.tsx";
import { SiteLayout } from "../Layouts/SiteLayout.tsx";
import {
  RP_COURSE,
  RP_LESSON,
  RP_MODULE,
  RP_MODULE_REDIRECT,
  RP_BUILD,
  RP_AUTH,
  RP_SYNC,
  RP_LESSON_COMPLETE,
  RP_LESSON_COMPLETE_STREAK_INCREASE,
  RP_BUILD_SELECTION as RP_BUILD_SELECTION,
  RP_ONBOARDING,
  RP_ONBOARDING_START,
  RP_PLAYGROUND,
  RP_PROJECT,
} from "../constants/routes.ts";
import { LessonLayout } from "../Layouts/LessonLayout.tsx";
import { QueryClient } from "@tanstack/react-query";
import { AuthPage } from "../features/Auth/AuthPage";
import {
  builderPageLoader,
  buildSectionLoader,
  modulePageLoader,
  modulesRedirectLoader,
} from "./Loaders/modulesLoader";
import { qo } from "../Hooks/Queries/Definitions/queries";
import { coursesLoader } from "./Loaders/coursesLoader";
import { SyncingPage } from "../features/Common/LoadingPages/SyncingPage.tsx";
import { LessonCompletionPage } from "../features/Completion/LessonCompletionPage.tsx";
import { StreakIncreasePage } from "../features/Completion/StreakIncreasePage.tsx";
import type { LessonSubmission } from "../Types/Exercise/LessonSubmissionTypes.ts";
import { OnboardingLayout } from "@/Layouts/OnboardingLayout.tsx";
import {
  stepOrder,
  type StageKey,
} from "@/Types/Onboarding/OnboardingSteps.ts";
import { OnboardingStagePage } from "@/features/Onboarding/OnboardingStagePage.tsx";
import { ProjectPage } from "@/features/Project/ProjectPage.tsx";
import { PlaygroundPage } from "@/features/Playground/PlaygroundPage.tsx";
import { playgroundLoader, projectLoader } from "./Loaders/playgroundLoader.ts";
import { BuilderRedirectPage } from "@/features/Builder/BuilderRedirectPage.tsx";
import { BuilderLayout } from "@/Layouts/BuilderLayout.tsx";
import { ErrorPage } from "@/features/Error/ErrorPage.tsx";
import { DesktopOnlyPage } from "@/Layouts/ErrorPage/DesktopOnlyPage.tsx";
import { LessonPage } from "@/features/Exercise/LessonPage.tsx";
import { ProjectLayout } from "@/Layouts/ProjectLayout.tsx";

export const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  beforeLoad: async () => {
    await sleep(300);
  },
});

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const authedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "authed",
  beforeLoad: async ({ location }) => {
    const user = await queryClient
      .ensureQueryData(qo.currentUser())
      .catch(() => null);
    if (!user) throw redirect({ to: RP_AUTH });

    const currentCourseId = await queryClient
      .ensureQueryData(qo.currentCourseId())
      .catch(() => null);
    const userPreferences = await queryClient
      .ensureQueryData(qo.preferences())
      .catch(() => null);

    if (location.pathname.startsWith(RP_ONBOARDING)) return;

    if (!currentCourseId || !userPreferences) {
      throw redirect({ to: RP_ONBOARDING_START, replace: true });
    }
  },
});

export const desktopGuardRoute = createRoute({
  getParentRoute: () => authedRoute,
  id: "desktopguard",
  component: DesktopOnlyPage,
});

export const siteRoute = createRoute({
  getParentRoute: () => authedRoute,
  id: "site",
  loader: async ({}) => {
    const currentUser = await queryClient.ensureQueryData(qo.currentUser());
    const userStats = await queryClient.ensureQueryData(
      qo.coins(currentUser.id)
    );
    const userStreak = await queryClient.ensureQueryData(
      qo.streak(currentUser.id)
    );

    if (!userStats || !userStreak || !currentUser)
      throw redirect({ to: RP_AUTH, replace: true });

    return { userStats, userStreak };
  },
  component: SiteLayout,
});

export const courseRoute = createRoute({
  getParentRoute: () => siteRoute,
  path: RP_COURSE,
  staticData: { headerTitle: "Courses" },
  loader: async ({}) => coursesLoader(queryClient),
  component: CoursePage,
});

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: RP_AUTH,
  component: AuthPage,
});

export const playgroundRoute = createRoute({
  getParentRoute: () => siteRoute,
  path: RP_PLAYGROUND,
  staticData: { headerTitle: "Playground" },
  loader: async ({}) => playgroundLoader(queryClient),
  component: PlaygroundPage,
});

export const projectRoute = createRoute({
  getParentRoute: () => desktopGuardRoute,
  path: RP_PROJECT,
  loader: async ({ params }) => projectLoader(params, queryClient),
  component: ProjectLayout,
});

export const onboardingRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "onboarding",
  component: OnboardingLayout,
});

export const onboardingStageRoute = createRoute({
  getParentRoute: () => onboardingRoute,
  path: "$stage",
  parseParams: (p) => ({
    stage: (stepOrder.includes(p.stage as StageKey)
      ? p.stage
      : "course") as StageKey,
  }),
  component: OnboardingStagePage,
});

// export const profileMeRoute = createRoute({
//   getParentRoute: () => defaultSectionRoute,
//   path: RP_ME,
//   loader: async ({ location }) => {
//     const userId = "1";
//     const target = `/profile/${userId}`;
//     if (location.pathname !== target) {
//       throw redirect({
//         to: RP_PROFILE,
//         params: { userId },
//         replace: true,
//       });
//     }
//     return null;
//   },
// });

// export const profileByIdRoute = createRoute({
//   getParentRoute: () => defaultSectionRoute,
//   path: RP_PROFILE,
//   staticData: { headerTitle: "Profile" },
//   component: ProfilePage,
// });

export const modulesRedirectRoute = createRoute({
  getParentRoute: () => siteRoute,
  path: RP_MODULE_REDIRECT,
  staticData: { headerTitle: "Modules" },
  loader: async ({ location }) => modulesRedirectLoader(location, queryClient),
});

export const buildRoute = createRoute({
  getParentRoute: () => desktopGuardRoute,
  path: RP_BUILD,
  validateSearch: (s: Record<string, unknown>) => ({
    moduleId: typeof s.moduleId === "string" ? s.moduleId : undefined,
    lessonId: typeof s.lessonId === "string" ? s.lessonId : undefined,
    exerciseId: typeof s.exerciseId === "string" ? s.exerciseId : undefined,
  }),
  loader: async ({ params }) => builderPageLoader(params, queryClient),
  component: BuilderLayout,
});

export const buildSelectionRoute = createRoute({
  getParentRoute: () => siteRoute,
  path: RP_BUILD_SELECTION,
  staticData: { headerTitle: "Builder " },
  loader: async ({ location }) => buildSectionLoader(location, queryClient),
  component: BuilderRedirectPage,
});

export const moduleRoute = createRoute({
  getParentRoute: () => siteRoute,
  path: RP_MODULE,
  staticData: { headerTitle: "Modules" },
  loader: async ({ params }) => modulePageLoader(params, queryClient),
  component: ModuleLayout,
});

export const lessonSectionRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: RP_LESSON,
  loader: async ({ params }) => {
    const exercises = await queryClient.ensureQueryData(
      qo.exercises(params.lessonId)
    );
    const lesson = await queryClient.ensureQueryData(
      qo.lesson(params.lessonId)
    );
    return { exercises, lesson };
  },
  component: LessonLayout,
});

export const syncRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: RP_SYNC,
  loader: async ({}) => {
    const currentUser = await queryClient.ensureQueryData(qo.currentUser());
    const userStats = await queryClient.ensureQueryData(
      qo.coins(currentUser.id)
    );
    const oldStreak = userStats.streak;
    return { oldStreak };
  },
  component: SyncingPage,
});

export const completeRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: RP_LESSON_COMPLETE,
  component: LessonCompletionPage,
});

export const streakIncreaseRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: RP_LESSON_COMPLETE_STREAK_INCREASE,
  component: StreakIncreasePage,
});

export const lessonRoute = createRoute({
  getParentRoute: () => lessonSectionRoute,
  path: "/",
  validateSearch: (s) => ({
    exercise: Number(s.exercise) || 1,
  }),
  component: LessonPage,
});

const routeTree = rootRoute.addChildren([
  authedRoute.addChildren([
    onboardingRoute.addChildren([onboardingStageRoute]),
    siteRoute.addChildren([
      courseRoute,
      playgroundRoute,
      buildSelectionRoute,
      modulesRedirectRoute,
      moduleRoute,
    ]),
    desktopGuardRoute.addChildren([projectRoute, buildRoute]),
    lessonSectionRoute.addChildren([lessonRoute]),
    syncRoute,
    completeRoute,
    streakIncreaseRoute,
  ]),
  authRoute,
]);

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultNotFoundComponent: () => {
    return <ErrorPage errorCode={404} />;
  },
});

declare module "@tanstack/react-router" {
  interface HistoryState {
    submission?: LessonSubmission;
  }
}
