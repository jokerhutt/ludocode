import { getNavIcons } from "@/constants/content/navIcons.ts";
import { useLocation } from "@tanstack/react-router";
import { LabelPair } from "@ludocode/design-system/primitives/LabelPair";
import { HollowSlotButton } from "@ludocode/design-system/primitives/hollow-slot";
import { useCurrentCourseContext } from "@/features/Hub/Context/CurrentCourseContext.tsx";
import { useIsMobile } from "@ludocode/hooks";

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
    <LabelPair className={groupClassName}>
      {iconsToRender.map((icon) => (
        <HollowSlotButton
          dataTestId={`nav-button-${dataTestIdPrefix}-${icon.name}`}
          className={buttonClassName}
          active={isActive(icon.path)}
          key={icon.name}
          onClick={() => !!icon.onClick && icon.onClick()}
        >
          <p>{icon.name}</p>
        </HollowSlotButton>
      ))}
    </LabelPair>
  );
}
