import { router } from "@/main";
import { adminNavigation } from "./adminNavigation";

export type NavIcon = {
  name: string;
  icon?: string;
  path: string;
  onClick?: () => void;
  desktopOnly?: boolean;
};

export const getAdminNavIcons = (): NavIcon[] => [
  {
    name: "Builder",
    path: "/builder",
    onClick: () => router.navigate(adminNavigation.hub.builder.toBuilderHub()),
  },
  {
    name: "Courses",
    path: "/courses",
    onClick: () =>
      router.navigate(adminNavigation.hub.courses.toCoursesHub()),
  },
  {
    name: "Languages",
    path: "/languages",
    onClick: () =>
      router.navigate(adminNavigation.hub.languages.toLanguagesHub()),
  },
];
