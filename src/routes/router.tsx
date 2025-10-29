import {
  createRouter,
  createRoute,
  createRootRoute,
  redirect,
} from "@tanstack/react-router";
import { TutorialPage } from "../features/Tutorial/TutorialPage";
import { CoursePage } from "../features/Courses/CoursePage";
import { ModulePage } from "../features/Module/ModulePage";
import { SiteLayout } from "../Layouts/SiteLayout";
import { DefaultSectionLayout } from "../Layouts/DefaultSectionLayout";
import { ModuleSectionLayout } from "../Layouts/ModuleSectionLayout";
import { ProfilePage } from "../features/Profile/ProfilePage";
import {
  RP_COURSE,
  RP_LESSON,
  RP_ME,
  RP_MODULE,
  RP_MODULE_REDIRECT,
  RP_BUILD,
  RP_PROFILE,
  RP_AUTH,
  RP_SYNC,
  RP_LESSON_COMPLETE,
  RP_LESSON_COMPLETE_STREAK_INCREASE,
  RP_BUILD_REDIRECT,
} from "../constants/routes.ts";
import { LessonLayout } from "../Layouts/LessonLayout";
import { QueryClient } from "@tanstack/react-query";
import { AuthPage } from "../features/Auth/AuthPage";
import {
  builderPageLoader,
  buildRedirectLoader,
  modulePageLoader,
  modulesRedirectLoader,
} from "./Loaders/modulesLoader";
import { qo } from "../Hooks/Queries/Definitions/queries";
import { coursesLoader } from "./Loaders/coursesLoader";
import { SyncingPage } from "../features/Common/LoadingPages/SyncingPage.tsx";
import { LessonCompletionPage } from "../features/Completion/LessonCompletionPage.tsx";
import { StreakIncreasePage } from "../features/Completion/StreakIncreasePage.tsx";
import type { LessonSubmission } from "../Types/Exercise/LessonSubmissionTypes.ts";
import { BuilderLayout } from "../features/Builder/BuilderLayout.tsx";
import { ensureTreeData } from "./routerEnsures.ts";

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
  beforeLoad: async () => {
    console.log("Checking user");
    const user = await queryClient
      .ensureQueryData(qo.currentUser())
      .catch(() => null);
    if (!user) throw redirect({ to: RP_AUTH });
  },
});

export const siteRoute = createRoute({
  getParentRoute: () => authedRoute,
  id: "site",
  loader: async ({}) => {
    const currentUser = await queryClient.ensureQueryData(qo.currentUser());
    const userStats = await queryClient.ensureQueryData(
      qo.stats(currentUser.id)
    );
    return { userStats };
  },
  component: SiteLayout,
});

export const defaultSectionRoute = createRoute({
  getParentRoute: () => siteRoute,
  id: "defaultsection",
  component: DefaultSectionLayout,
});

export const moduleSectionRoute = createRoute({
  getParentRoute: () => siteRoute,
  id: "modulesection",
  component: ModuleSectionLayout,
});

export const courseRoute = createRoute({
  getParentRoute: () => defaultSectionRoute,
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

export const profileMeRoute = createRoute({
  getParentRoute: () => defaultSectionRoute,
  path: RP_ME,
  loader: async ({ location }) => {
    const userId = "1";
    const target = `/profile/${userId}`;
    if (location.pathname !== target) {
      throw redirect({
        to: RP_PROFILE,
        params: { userId },
        replace: true,
      });
    }
    return null;
  },
});

export const profileByIdRoute = createRoute({
  getParentRoute: () => defaultSectionRoute,
  path: RP_PROFILE,
  staticData: { headerTitle: "Profile" },
  component: ProfilePage,
});

export const modulesRedirectRoute = createRoute({
  getParentRoute: () => moduleSectionRoute,
  path: RP_MODULE_REDIRECT,
  loader: async ({ location }) => modulesRedirectLoader(location, queryClient),
});

export const buildRoute = createRoute({
  getParentRoute: () => siteRoute,
  path: RP_BUILD,
  validateSearch: (s: Record<string, unknown>) => ({
    lessonId: typeof s.lessonId === "string" ? s.lessonId : undefined,
  }),
  loader: async ({ params }) => builderPageLoader(params, queryClient),
  component: BuilderLayout,
});

export const buildRedirectRoute = createRoute({
  getParentRoute: () => siteRoute,
  path: RP_BUILD_REDIRECT,
  loader: async ({ location }) => buildRedirectLoader(location, queryClient),
});

export const moduleRoute = createRoute({
  getParentRoute: () => moduleSectionRoute,
  path: RP_MODULE,
  loader: async ({ params }) => modulePageLoader(params, queryClient),
  component: ModulePage,
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
      qo.stats(currentUser.id)
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
  component: TutorialPage,
});

const routeTree = rootRoute.addChildren([
  authedRoute.addChildren([
    siteRoute.addChildren([
      defaultSectionRoute.addChildren([
        courseRoute,
        profileMeRoute,
        profileByIdRoute,
      ]),
      moduleSectionRoute.addChildren([modulesRedirectRoute, moduleRoute]),
      buildRedirectRoute,
      buildRoute,
    ]),
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
});

declare module "@tanstack/react-router" {
  interface HistoryState {
    submission?: LessonSubmission;
  }
}
