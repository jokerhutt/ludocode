import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { CoursePage } from "../features/Hub/CourseHub/CoursePage.tsx";
import { ModuleHubLayout } from "@/layouts/Hub/ModuleHubLayout.tsx";
import { HubLayout } from "@/layouts/Hub/HubLayout.tsx";
import { routes } from "../constants/router/routes.ts";
import { LessonLayout } from "@/layouts/Lesson/LessonLayout.tsx";
import { QueryClient } from "@tanstack/react-query";
import { AuthPage } from "../features/Auth/AuthPage";
import {
  modulePageLoader,
  modulesRedirectLoader,
} from "@/routes/loaders/modulesLoader";
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
import {
  projectHubLoader,
  projectLoader,
} from "@/routes/loaders/projectLoader.ts";
import { ErrorPage } from "@/features/Error/ErrorPage.tsx";
import { LessonPage } from "@/features/Exercise/LessonPage.tsx";
import { ProjectLayout } from "@/layouts/Project/ProjectLayout.tsx";
import { CompletionLayout } from "@/layouts/Completion/CompletionLayout.tsx";
import z from "zod";
import { DesktopOnlyPage } from "@/layouts/Fallback/DesktopOnlyPage.tsx";
import { BuilderLayout } from "@/layouts/Builder/BuilderLayout.tsx";
import { BuilderHubPage } from "@/features/Hub/BuilderHub/BuilderHubPage.tsx";
import {
  builderHubLoader,
  builderPageLoader,
} from "./loaders/builderLoader.ts";
import { lessonPageLoader } from "./loaders/lessonsLoader.ts";
import { hubLoader } from "./loaders/hubLoader.ts";
import { syncLoader } from "./loaders/syncLoader.ts";
import { appPreloader, demoAuthPreloader } from "./preloaders/authPreloader.ts";

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
  beforeLoad: async ({ location }) => appPreloader(location, queryClient),
});

const demoAuthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.auth.demo,
  beforeLoad: async () => demoAuthPreloader(queryClient),
});

export const desktopGuardRoute = createRoute({
  getParentRoute: () => appRoute,
  id: "desktopguard",
  component: DesktopOnlyPage,
});

export const hubRoute = createRoute({
  getParentRoute: () => appRoute,
  id: "site",
  loader: async ({}) => hubLoader(queryClient),
  component: HubLayout,
});

export const courseHubRoute = createRoute({
  getParentRoute: () => hubRoute,
  path: routes.hub.coursesHub,
  staticData: { headerTitle: "Courses" },
  loader: async ({}) => coursesLoader(queryClient),
  component: CoursePage,
});

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.auth.authPage,
  component: AuthPage,
});

export const projectHubRoute = createRoute({
  getParentRoute: () => hubRoute,
  path: routes.hub.projectHub,
  staticData: { headerTitle: "Project" },
  loader: async ({}) => projectHubLoader(queryClient),
  component: ProjectHubPage,
});

export const projectRoute = createRoute({
  getParentRoute: () => desktopGuardRoute,
  path: routes.project.projectPage,
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
  path: routes.hub.module.moduleRedirect,
  staticData: { headerTitle: "Modules" },
  loader: async ({ location }) => modulesRedirectLoader(location, queryClient),
});

export const buildRoute = createRoute({
  getParentRoute: () => desktopGuardRoute,
  path: routes.build.builderPage,
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
  path: routes.hub.buildHub,
  staticData: { headerTitle: "Builder " },
  loader: async ({ location }) => builderHubLoader(location, queryClient),
  component: BuilderHubPage,
});

export const moduleHubRoute = createRoute({
  getParentRoute: () => hubRoute,
  path: routes.hub.module.moduleHub,
  staticData: { headerTitle: "Modules" },
  loader: async ({ params }) => modulePageLoader(params, queryClient),
  component: ModuleHubLayout,
});

export const lessonRoute = createRoute({
  getParentRoute: () => appRoute,
  path: routes.lesson.lessonPage,
  loader: async ({ params }) => lessonPageLoader(params, queryClient),
  component: LessonLayout,
});

export const syncRoute = createRoute({
  getParentRoute: () => appRoute,
  path: routes.completion.syncPage,
  loader: async ({}) => syncLoader(queryClient),
  component: SyncingPage,
});

export const completionRoute = createRoute({
  getParentRoute: () => appRoute,
  path: routes.completion.completionPage,
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
