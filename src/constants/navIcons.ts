import { router } from "../routes/router";
import { ludoNavigation } from "../routes/ludoNavigation";

export type NavIcon = {
  name: string;
  icon?: string;
  onClick?: (id?: string) => void;
};

export const navIcons: NavIcon[] = [
  {
    name: "Courses",
    onClick: () => router.navigate(ludoNavigation.courseRoot()),
  },
  {
    name: "Learn",
    onClick: () => router.navigate(ludoNavigation.module.toCurrent()),
  },
  {
    name: "Build",
    onClick: (id) => {
      if (!id) return
      router.navigate(ludoNavigation.build.to(id))
    },
  },
  {
    name: "Profile",
    onClick: () => router.navigate(ludoNavigation.me()),
  },
];
