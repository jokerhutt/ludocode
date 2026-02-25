import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { router } from "@/main.tsx";

export type NavIcon = {
  name: string;
  icon?: string;
  path: string;
  onClick?: () => void;
  desktopOnly?: boolean;
};

export const getNavIcons = (courseId: string, moduleId: string): NavIcon[] => [
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
    desktopOnly: true,
  },
  {
    name: "Leaderboard",
    path: "/leaderboard",
    onClick: () => router.navigate(ludoNavigation.hub.leaderboard.toLeaderboardHub()),
  },
];
