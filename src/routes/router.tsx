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
import {
  RP_COURSE,
  RP_LESSON,
  RP_ME,
  RP_MODULE,
  RP_MODULE_REDIRECT,
  RP_PRACTICE,
  RP_PROFILE,
} from "./routePaths";
import { LessonLayout } from "../Layouts/LessonLayout";

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
  path: RP_COURSE,
  staticData: { headerTitle: "Courses" },
  component: CoursePage,
});

export const practiceRoute = createRoute({
  getParentRoute: () => defaultSectionRoute,
  path: RP_PRACTICE,
  staticData: { headerTitle: "Practice" },
  component: PracticePage,
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
  loader: async ({ location }) => {
    const courseName = "Python";
    const position = 1;
    const target = `/course/${courseName}/module/${position}`;

    if (location.pathname !== target) {
      throw redirect({
        to: RP_MODULE,
        params: { courseName, position },
        replace: true,
      });
    }
    return null;
  },
});

export const moduleRoute = createRoute({
  getParentRoute: () => moduleSectionRoute,
  path: RP_MODULE,
  component: ModulePage,
});

export const lessonSectionRoute = createRoute({
  getParentRoute: () => rootRoute,
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
  siteRoute.addChildren([
    defaultSectionRoute.addChildren([
      courseRoute,
      practiceRoute,
      profileMeRoute,
      profileByIdRoute,
    ]),
    moduleSectionRoute.addChildren([modulesRedirectRoute, moduleRoute]),
  ]),
  lessonSectionRoute.addChildren([lessonRoute])
]);
export const router = createRouter({ routeTree });
