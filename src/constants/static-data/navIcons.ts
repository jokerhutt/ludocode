import { router } from "../../routes/router";
import { ludoNavigation } from "../../routes/navigator/ludoNavigation.tsx";
import { routes } from "../router/routes";

export type NavIcon = {
  name: string;
  icon?: string;
  path: string;
  onClick?: () => void;
};

export const getNavIcons = (
  userId: string,
  courseId: string,
  moduleId: string
): NavIcon[] => [
  {
    name: "Courses",
    path: routes.hub.courses,
    onClick: () => router.navigate(ludoNavigation.courseRoot()),
  },
  {
    name: "Learn",
    path: routes.hub.module.root,
    onClick: () =>
      router.navigate(ludoNavigation.hub.module.toModule(courseId, moduleId)),
  },
  {
    name: "Projects",
    path: routes.hub.project,
    onClick: () => router.navigate(ludoNavigation.hub.project.toProjectHub()),
  },
  {
    name: "Profile",
    path: routes.hub.profile.root,
    onClick: () =>
      router.navigate(ludoNavigation.hub.profile.toProfile(userId)),
  },
  {
    name: "Build",
    path: routes.hub.builder,
    onClick: () => router.navigate(ludoNavigation.hub.builder.toBuilderHub()),
  },
];
