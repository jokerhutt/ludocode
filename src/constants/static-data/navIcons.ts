import { router } from "../../routes/router";
import { ludoNavigation } from "../../routes/ludoNavigation";
import { RP_BUILD_HUB, RP_COURSE, RP_PROJECT_HUB } from "../router/routes";

export type NavIcon = {
  name: string;
  icon?: string;
  path: string;
  redirectPath?: string;
  onClick?: () => void;
};

export const navIcons: NavIcon[] = [
  {
    name: "Courses",
    path: RP_COURSE,
    onClick: () => router.navigate(ludoNavigation.courseRoot()),
  },
  {
    name: "Learn",
    redirectPath: "/modules",
    path: "/course",
    onClick: () => router.navigate(ludoNavigation.module.toCurrent()),
  },
  {
    name: "Playground",
    path: RP_PROJECT_HUB,
    onClick: () => router.navigate(ludoNavigation.playground.toPlayground()),
  },
  {
    name: "Build",
    path: "/build",
    redirectPath: RP_BUILD_HUB,
    onClick: () => router.navigate(ludoNavigation.build.toSelectCourse()),
  },
];
