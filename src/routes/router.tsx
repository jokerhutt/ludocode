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
import { PracticePage } from "../features/Practice/PracticePage";

const rootRoute = createRootRoute();

export const siteRoute = createRoute({
  getParentRoute: () => rootRoute,
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

const courseRoute = createRoute({
  getParentRoute: () => defaultSectionRoute,
  path: "/",
  staticData: { headerTitle: "Courses" },
  component: CoursePage,
});

export const tutorialRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: `/tutorial/$tutorialId/exercise/$position`,
  component: TutorialPage,
});

export const practiceRoute = createRoute({
  getParentRoute: () => defaultSectionRoute,
  path: `/practice`,
  staticData: { headerTitle: "Practice" },
  component: PracticePage,
});

export const profileMeRoute = createRoute({
  getParentRoute: () => defaultSectionRoute,
  path: "/profile",
  loader: async ({ location }) => {
    const userId = "1";
    const target = `/profile/${userId}`;
    if (location.pathname !== target) {
      throw redirect({
        to: "/profile/$userId",
        params: { userId },
        replace: true,
      });
    }
    return null;
  },
});

export const profileByIdRoute = createRoute({
  getParentRoute: () => defaultSectionRoute,
  path: "/profile/$userId",
  staticData: { headerTitle: "Profile" },
  component: ProfilePage,
});

export const modulesRedirectRoute = createRoute({
  getParentRoute: () => moduleSectionRoute,
  path: "/modules",
  loader: async ({ location }) => {
    const courseName = "Python";
    const position = 1;
    const target = `/course/${courseName}/module/${position}`;

    if (location.pathname !== target) {
      throw redirect({
        to: "/course/$courseName/module/$position",
        params: { courseName, position },
        replace: true,
      });
    }
    return null;
  },
});

export const moduleRoute = createRoute({
  getParentRoute: () => moduleSectionRoute,
  path: "/course/$courseName/module/$position",
  component: ModulePage,
});

const routeTree = rootRoute.addChildren([
  siteRoute.addChildren([
    defaultSectionRoute.addChildren([courseRoute, practiceRoute, profileMeRoute, profileByIdRoute]),
    moduleSectionRoute.addChildren([modulesRedirectRoute, moduleRoute]),
  ]),
  tutorialRoute,
]);
export const router = createRouter({ routeTree });
