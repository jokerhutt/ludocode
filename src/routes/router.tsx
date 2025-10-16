import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { TutorialPage } from "../features/Tutorial/TutorialPage";
import { HomePage } from "../features/Home/HomePage";
import { ModulePage } from "../features/Course/ModulePage";

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

export const tutorialRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: `/tutorial/$tutorialId/exercise/$position`,
  component: TutorialPage,
});

export const unitsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: `/course/$courseName/unit/$position`,
  component: ModulePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  tutorialRoute,
  unitsRoute,
]);
export const router = createRouter({ routeTree });
