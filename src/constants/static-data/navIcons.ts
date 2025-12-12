import { ludoNavigation } from "@/old-routes/navigator/ludoNavigation.tsx";
import { routes } from "../router/routes";
import { router } from "@/main";

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
    path: "/courses",
    onClick: () => router.navigate(ludoNavigation.courseRoot()),
  },
  {
    name: "Learn",
    path: "/learn",
    onClick: () =>
      router.navigate(ludoNavigation.hub.module.toModule(courseId, moduleId)),
  },
  {
    name: "Projects",
    path: "/projects",
    onClick: () => router.navigate(ludoNavigation.hub.project.toProjectHub()),
  },
  {
    name: "Profile",
    path: "/profile",
    onClick: () =>
      router.navigate(ludoNavigation.hub.profile.toProfile(userId)),
  },
  {
    name: "Build",
    path: "/builder",
    onClick: () => router.navigate(ludoNavigation.hub.builder.toBuilderHub()),
  },
];
