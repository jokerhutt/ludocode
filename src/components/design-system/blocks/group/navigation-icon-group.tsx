import { getNavIcons } from "@/constants/static-data/navIcons";
import { useLocation } from "@tanstack/react-router";
import { HollowSlotButtonGroup } from "./hollow-slot-button-group.tsx";
import { HollowSlotButton } from "@/components/design-system/atoms/button/hollow-slot-button.tsx";
import { useFeatureEnabledCheck } from "@/hooks/App/useFeatureEnabledCheck.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useCurrentCourseContext } from "@/hooks/Context/Progress/CurrentCourseContext.tsx";

type NavigationIconGroupProps = {
  groupClassName?: string;
  buttonClassName?: string;
};

export function NavigationIconGroup({
  groupClassName,
  buttonClassName,
}: NavigationIconGroupProps) {
  const { enabled: isAdmin } = useFeatureEnabledCheck({
    feature: "isAdminEnabled",
  });

  const { data: currentUser } = useSuspenseQuery(qo.currentUser());
  const { courseId, moduleId } = useCurrentCourseContext();

  const icons = getNavIcons(currentUser.id, courseId, moduleId);
  const userIcons = icons.filter((icon) => icon.name !== "Build");

  const iconsToRender = isAdmin ? icons : userIcons;

  const location = useLocation();

  const isActive = (iconPath: string): boolean => {
    return location.pathname.startsWith(iconPath);
  };

  return (
    <HollowSlotButtonGroup className={groupClassName}>
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
    </HollowSlotButtonGroup>
  );
}
