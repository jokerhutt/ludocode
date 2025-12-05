import { router } from "../../routes/router";
import { ludoNavigation } from "../../routes/navigator/ludoNavigation.tsx";
import { routes } from "../router/routes";

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
    path: routes.hub.courses,
    onClick: () => router.navigate(ludoNavigation.courseRoot()),
  },
  {
    name: "Learn",
    redirectPath: routes.hub.module.root,
    path: "/course",
    onClick: () => router.navigate(ludoNavigation.hub.module.toCurrent()),
  },
  {
    name: "Projects",
    path: routes.hub.project,
    onClick: () => router.navigate(ludoNavigation.hub.project.toProjectHub()),
  },
  {
    name: "Profile",
    path: routes.hub.profile.root,
    onClick: () => router.navigate(ludoNavigation.hub.profile.me()),
  },
  {
    name: "Build",
    path: "/build",
    redirectPath: routes.hub.builder,
    onClick: () => router.navigate(ludoNavigation.hub.builder.toBuilderHub()),
  },
];
