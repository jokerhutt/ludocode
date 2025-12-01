import {
  createRouter,
  createRoute,
  createRootRoute,
  redirect,
} from "@tanstack/react-router";
import { CoursePage } from "../features/Hub/CourseHub/CoursePage.tsx";
import { ModuleHubLayout } from "@/layouts/Hub/ModuleHubLayout.tsx";
import { HubLayout } from "@/layouts/Hub/HubLayout.tsx";
import {
  RP_COURSE,
  RP_LESSON,
  RP_MODULE,
  RP_MODULE_REDIRECT,
  RP_BUILD,
  RP_AUTH,
  RP_SYNC,
  RP_BUILD_HUB,
  RP_ONBOARDING,
  RP_ONBOARDING_START,
  RP_PROJECT_HUB,
  RP_PROJECT,
  RP_DEMO,
} from "../constants/router/routes.ts";
import { LessonLayout } from "@/layouts/Lesson/LessonLayout.tsx";
import { QueryClient } from "@tanstack/react-query";
import { AuthPage } from "../features/Auth/AuthPage";
import {
  builderPageLoader,
  buildSectionLoader,
  modulePageLoader,
  modulesRedirectLoader,
} from "@/routes/loaders/modulesLoader";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { coursesLoader } from "@/routes/loaders/coursesLoader";
import { SyncingPage } from "../features/Completion/SyncingPage.tsx";
import type { LessonSubmission } from "@/types/Exercise/LessonSubmissions.ts";
import { OnboardingLayout } from "@/layouts/Onboarding/OnboardingLayout.tsx";
import {
  stepOrder,
  type StageKey,
} from "@/types/Onboarding/OnboardingSteps.ts";
import { OnboardingStagePage } from "@/features/Onboarding/OnboardingStagePage.tsx";
import { ProjectHubPage } from "@/features/Hub/ProjectHub/ProjectHubPage.tsx";
import { playgroundLoader, projectLoader } from "@/routes/loaders/playgroundLoader.ts";
import { ErrorPage } from "@/features/Error/ErrorPage.tsx";
import { LessonPage } from "@/features/Exercise/LessonPage.tsx";
import { ProjectLayout } from "@/layouts/Project/ProjectLayout.tsx";
import { DEMO_LOGIN } from "@/constants/api/pathConstants.ts";
import { CompletionLayout } from "@/layouts/Completion/CompletionLayout.tsx";
import z from "zod";
import { DesktopOnlyPage } from "@/layouts/Fallback/DesktopOnlyPage.tsx";
import { BuilderLayout } from "@/layouts/Builder/BuilderLayout.tsx";
import { BuilderHubPage } from "@/features/Hub/BuilderHub/BuilderHubPage.tsx";

export const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  beforeLoad: async () => {
    await sleep(300);
  },
});

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const appRoute = createRoute({
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

const demoAuthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: RP_DEMO,
  beforeLoad: async () => {
    await fetch(DEMO_LOGIN, {
      method: "GET",
      credentials: "include",
    });
    await queryClient.invalidateQueries();
    await queryClient.ensureQueryData(qo.currentUser());

    throw redirect({ to: RP_COURSE });
  },
});

export const desktopGuardRoute = createRoute({
  getParentRoute: () => appRoute,
  id: "desktopguard",
  component: DesktopOnlyPage,
});

export const hubRoute = createRoute({
  getParentRoute: () => appRoute,
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
  component: HubLayout,
});

export const courseHubRoute = createRoute({
  getParentRoute: () => hubRoute,
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

export const projectHubRoute = createRoute({
  getParentRoute: () => hubRoute,
  path: RP_PROJECT_HUB,
  staticData: { headerTitle: "Project" },
  loader: async ({}) => playgroundLoader(queryClient),
  component: ProjectHubPage,
});

export const projectRoute = createRoute({
  getParentRoute: () => desktopGuardRoute,
  path: RP_PROJECT,
  loader: async ({ params }) => projectLoader(params, queryClient),
  component: ProjectLayout,
});

export const onboardingRoute = createRoute({
  getParentRoute: () => appRoute,
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

export const moduleHubRedirectRoute = createRoute({
  getParentRoute: () => hubRoute,
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

export const builderHubRoute = createRoute({
  getParentRoute: () => hubRoute,
  path: RP_BUILD_HUB,
  staticData: { headerTitle: "Builder " },
  loader: async ({ location }) => buildSectionLoader(location, queryClient),
  component: BuilderHubPage,
});

export const moduleHubRoute = createRoute({
  getParentRoute: () => hubRoute,
  path: RP_MODULE,
  staticData: { headerTitle: "Modules" },
  loader: async ({ params }) => modulePageLoader(params, queryClient),
  component: ModuleHubLayout,
});

export const lessonRoute = createRoute({
  getParentRoute: () => appRoute,
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
  getParentRoute: () => appRoute,
  path: RP_SYNC,
  loader: async ({}) => {
    const currentUser = await queryClient.ensureQueryData(qo.currentUser());
    const userCoins = await queryClient.ensureQueryData(
      qo.coins(currentUser.id)
    );
    const userStreak = await queryClient.ensureQueryData(
      qo.streak(currentUser.id)
    );
    const oldStreak = userStreak.current;
    return { oldStreak };
  },
  component: SyncingPage,
});

export const completionRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/completion/$courseId/lesson/$lessonId",
  component: CompletionLayout,
  validateSearch: z.object({
    step: z.enum(["lesson", "streak", "course"]).default("lesson"),
    coins: z.number().optional(),
    accuracy: z.number().optional(),
    oldStreak: z.number().optional(),
    newStreak: z.number().optional(),
    completionStatus: z.string().optional(),
  }),
});

export const lessonPageRoute = createRoute({
  getParentRoute: () => lessonRoute,
  path: "/",
  validateSearch: (s) => ({
    exercise: Number(s.exercise) || 1,
  }),
  component: LessonPage,
});

const routeTree = rootRoute.addChildren([
  demoAuthRoute,
  authRoute,
  appRoute.addChildren([
    onboardingRoute.addChildren([onboardingStageRoute]),
    hubRoute.addChildren([
      courseHubRoute,
      projectHubRoute,
      builderHubRoute,
      moduleHubRedirectRoute,
      moduleHubRoute,
    ]),
    desktopGuardRoute.addChildren([projectRoute, buildRoute]),
    lessonRoute.addChildren([lessonPageRoute]),
    syncRoute,
    completionRoute,
  ]),
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
