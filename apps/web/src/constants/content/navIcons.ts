import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { router } from "@/main.tsx";
import type { LucideIcon } from "lucide-react";
import {
  BookOpenIcon,
  GraduationCapIcon,
  FolderCodeIcon,
} from "lucide-react";

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
    path: "/courses",
    onClick: () => router.navigate(ludoNavigation.courseRoot()),
  },
  {
    name: "Learn",
    icon: GraduationCapIcon,
    path: "/learn",
    onClick: () =>
      router.navigate(ludoNavigation.hub.module.toModule(courseId, moduleId)),
  },
  {
    name: "Projects",
    icon: FolderCodeIcon,
    path: "/projects",
    onClick: () => router.navigate(ludoNavigation.hub.project.toProjectHub()),
    desktopOnly: true,
  },
];
