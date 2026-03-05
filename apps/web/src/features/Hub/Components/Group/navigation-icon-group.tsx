import { getNavIcons } from "@/constants/content/navIcons.ts";
import { useLocation } from "@tanstack/react-router";
import { useCurrentCourseContext } from "@/features/Hub/Context/CurrentCourseContext.tsx";
import { useIsMobile } from "@ludocode/hooks";
import { cn } from "@ludocode/design-system/cn-utils";

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
    <div className={cn("flex items-center gap-1", groupClassName)}>
      {iconsToRender.map((navItem) => {
        const active = isActive(navItem.path);
        const Icon = navItem.icon;

        return (
          <button
            key={navItem.name}
            type="button"
            data-testid={`nav-button-${dataTestIdPrefix}-${navItem.name}`}
            onClick={() => navItem.onClick?.()}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150",
              "hover:cursor-pointer text-sm font-medium",
              active
                ? "bg-ludo-accent/15 text-white"
                : "text-ludo-white-dim hover:text-white hover:bg-white/5",
              buttonClassName,
            )}
          >
            <Icon
              className={cn(
                "w-4 h-4 shrink-0 transition-colors",
                active ? "text-ludo-accent" : "text-current",
              )}
            />
            <span>{navItem.name}</span>
          </button>
        );
      })}
    </div>
  );
}
