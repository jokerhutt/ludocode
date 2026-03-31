import { getNavIcons } from "@/constants/content/navIcons.ts";
import { useLocation } from "@tanstack/react-router";
import { useCurrentCourseContext } from "@/features/course/context/CurrentCourseContext.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { useIsMobile } from "@ludocode/hooks";
import { testIds } from "@ludocode/util/test-ids";
import { NavButton } from "@ludocode/design-system/primitives/NavButton.tsx";

type NavigationIconGroupProps = {
  groupClassName?: string;
  dataTestIdPrefix?: "header" | "footer";
  buttonClassName?: string;
};

export function NavigationIconGroup({
  groupClassName,
  dataTestIdPrefix = "header",
  buttonClassName,
}: NavigationIconGroupProps) {
  const { courseId, moduleId } = useCurrentCourseContext();

  const isMobile = useIsMobile({});

  const icons = getNavIcons(courseId, moduleId);

  const iconsToRender = isMobile
    ? icons.filter((icon) => !icon.desktopOnly)
    : icons;

  const location = useLocation();

  const isActive = (iconPath: string): boolean => {
    return location.pathname.startsWith(iconPath);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1",
        isMobile && "w-full justify-around gap-0",
        groupClassName,
      )}
    >
      {iconsToRender.map((navItem) => (
        <NavButton
          key={navItem.name}
          text={navItem.name}
          icon={navItem.icon}
          active={isActive(navItem.path)}
          testId={testIds.nav.button(dataTestIdPrefix, navItem.name)}
          onClick={() => navItem.onClick?.()}
          className={buttonClassName}
        />
      ))}
    </div>
  );
}
