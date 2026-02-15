import { getAdminNavIcons } from "@/constants/adminNavIcons";
import { useLocation } from "@tanstack/react-router";
import { LabelPair } from "@ludocode/design-system/primitives/LabelPair";
import { HollowSlotButton } from "@ludocode/design-system/primitives/hollow-slot";

type AdminNavigationIconGroupProps = {};

export function AdminNavigationIconGroup({}: AdminNavigationIconGroupProps) {
  const icons = getAdminNavIcons();

  const location = useLocation();

  const isActive = (iconPath: string): boolean => {
    return location.pathname.startsWith(iconPath);
  };

  return (
    <LabelPair className="hidden lg:flex">
      {icons.map((icon) => (
        <HollowSlotButton
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
