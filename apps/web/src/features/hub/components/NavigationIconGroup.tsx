import { getNavIcons } from "@/constants/content/navIcons.ts";
import { useLocation } from "@tanstack/react-router";
import { useCurrentCourseContext } from "@/features/course/context/CurrentCourseContext.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { useIsMobile } from "@ludocode/hooks";
import { testIds } from "@ludocode/util/test-ids";

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
      {iconsToRender.map((navItem) => {
        const active = isActive(navItem.path);
        const Icon = navItem.icon;

        return (
          <button
            key={navItem.name}
            type="button"
            data-testid={testIds.nav.button(dataTestIdPrefix, navItem.name)}
            onClick={() => navItem.onClick?.()}
            className={cn(
              isMobile
                ? "flex flex-col items-center justify-center gap-1 px-1 py-1 min-w-14"
                : "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150",
              "hover:cursor-pointer text-sm font-medium",
              isMobile
                ? active
                  ? "text-ludo-white-bright"
                  : "text-ludo-white-dim hover:text-ludo-white-bright"
                : active
                  ? "bg-ludo-accent/15 text-ludo-white-bright"
                  : "text-ludo-white-dim hover:text-ludo-white-bright hover:bg-white/5",
              buttonClassName,
            )}
          >
            <span
              className={cn(
                isMobile
                  ? "flex h-8 w-8 items-center justify-center rounded-md transition-colors"
                  : "contents",
                isMobile &&
                  (active ? "bg-ludo-accent/20" : "bg-ludo-surface/60"),
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  active ? "text-ludo-accent" : "text-current",
                )}
              />
            </span>
            <span
              className={cn(isMobile && "text-[10px] leading-none text-center")}
            >
              {navItem.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
