import { getNavIcons } from "@/constants/content/navIcons.ts";
import { useLocation } from "@tanstack/react-router";
import { LabelPair } from "@ludocode/design-system/primitives/LabelPair";
import { HollowSlotButton } from "@ludocode/design-system/primitives/hollow-slot";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useCurrentCourseContext } from "@/features/Hub/Context/CurrentCourseContext.tsx";
import { useIsMobile } from "@ludocode/hooks";

type NavigationIconGroupProps = {
  groupClassName?: string;
  buttonClassName?: string;
};

export function NavigationIconGroup({
  groupClassName,
  buttonClassName,
}: NavigationIconGroupProps) {
  const { data: currentUser } = useSuspenseQuery(qo.currentUser());
  const { courseId, moduleId } = useCurrentCourseContext();

  const isMobile = useIsMobile({});

  const icons = getNavIcons(currentUser.id, courseId, moduleId);

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
