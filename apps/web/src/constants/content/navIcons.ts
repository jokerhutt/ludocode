import { track } from "@/analytics/track";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { router } from "@/main.tsx";
import type { LucideIcon } from "lucide-react";
import { BookOpenIcon, GraduationCapIcon, FolderCodeIcon } from "lucide-react";

export type NavIcon = {
  name: string;
  icon: LucideIcon;
  path: string;
  onClick?: () => void;
  desktopOnly?: boolean;
};

export const getNavIcons = (courseId: string, moduleId: string): NavIcon[] => [
  {
    name: "Courses",
    icon: BookOpenIcon,
    path: "/app/courses",
    onClick: () => {
      track({
        event: "NAVIGATION_CLICK",
        properties: { source: "hub_header", destination: "courses_hub" },
      });
      router.navigate(ludoNavigation.courseRoot());
    },
  },
  {
    name: "Learn",
    icon: GraduationCapIcon,
    path: "/app/learn",
    onClick: () => {
      track({
        event: "NAVIGATION_CLICK",
        properties: { source: "hub_header", destination: "learn_hub" },
      });
      router.navigate(ludoNavigation.hub.module.toModule(courseId, moduleId));
    },
  },
  {
    name: "Projects",
    icon: FolderCodeIcon,
    path: "/app/projects",
    onClick: () => {
      track({
        event: "NAVIGATION_CLICK",
        properties: { source: "hub_header", destination: "projects_hub" },
      });
      router.navigate(ludoNavigation.hub.project.toProjectHub());
    },
    desktopOnly: true,
  },
];
