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
import { BuilderPage } from "../features/Practice/BuilderPage";
import {
  RP_COURSE,
  RP_LESSON,
  RP_ME,
  RP_MODULE,
  RP_MODULE_REDIRECT,
  RP_BUILD,
  RP_PROFILE,
  RP_AUTH,
} from "../constants/routePaths";
import { LessonLayout } from "../Layouts/LessonLayout";
import { QueryClient } from "@tanstack/react-query";
import { AuthPage } from "../features/Auth/AuthPage";
import {
  modulePageLoader,
  modulesRedirectLoader,
} from "./Loaders/modulesLoader";
import { qo } from "../Hooks/Queries/queries";

export const queryClient = new QueryClient();

const rootRoute = createRootRoute();

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
  loader: async ({}) => {
    const allCourses = await queryClient.ensureQueryData(qo.allCourses());
    await Promise.all(
      allCourses.map((c) => queryClient.ensureQueryData(qo.courseProgress(c.id)))
    );

    return {allCourses};
  },
  component: CoursePage,
});

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: RP_AUTH,
  component: AuthPage,
});

export const buildRoute = createRoute({
  getParentRoute: () => defaultSectionRoute,
  path: RP_BUILD,
  staticData: { headerTitle: "Build" },
  component: BuilderPage,
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

export const moduleRoute = createRoute({
  getParentRoute: () => moduleSectionRoute,
  path: RP_MODULE,
  loader: async ({ params }) => modulePageLoader(params, queryClient),
  component: ModulePage,
});

export const lessonSectionRoute = createRoute({
  getParentRoute: () => authedRoute,
  id: "lessonSection",
  component: LessonLayout,
});

export const lessonRoute = createRoute({
  getParentRoute: () => lessonSectionRoute,
  path: RP_LESSON,
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
        buildRoute,
        profileMeRoute,
        profileByIdRoute,
      ]),
      moduleSectionRoute.addChildren([modulesRedirectRoute, moduleRoute]),
    ]),
    lessonSectionRoute.addChildren([lessonRoute]),
  ]),
  authRoute,
]);

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
});
