import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { TutorialPage } from "../features/Tutorial/TutorialPage";
import { CoursePage } from "../features/Courses/CoursePage";
import { ModulePage } from "../features/Module/ModulePage";
import { SiteLayout } from "../Layouts/SiteLayout";
import { DefaultSectionLayout } from "../Layouts/DefaultSectionLayout";


const rootRoute = createRootRoute();



export const siteRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'site',
  component: SiteLayout
})

export const defaultSectionRoute = createRoute({
  getParentRoute: () => siteRoute,
  id: 'default',
  component: DefaultSectionLayout
})

const courseRoute = createRoute({
  getParentRoute: () => defaultSectionRoute,
  path: "/",
  component: CoursePage,
});

export const tutorialRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: `/tutorial/$tutorialId/exercise/$position`,
  component: TutorialPage,
});

export const moduleRoute = createRoute({
  getParentRoute: () => siteRoute,
  path: `/course/$courseName/unit/$position`,
  component: ModulePage,
});

const routeTree = rootRoute.addChildren([
  siteRoute,
  defaultSectionRoute,
  courseRoute,
  tutorialRoute,
  moduleRoute,
]);
export const router = createRouter({ routeTree });
