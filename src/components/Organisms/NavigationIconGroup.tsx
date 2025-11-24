import { navIcons } from "@/constants/navIcons";
import { HollowSlotButton } from "../Atoms/Button/HollowSlotButton";
import { HollowSlotButtonGroup } from "../Molecules/Group/HollowSlotButtonGroup";
import { useLocation } from "@tanstack/react-router";

type NavigationIconGroupProps = {
  groupClassName?: string;
  buttonClassName?: string;
};

export function NavigationIconGroup({
  groupClassName,
  buttonClassName,
}: NavigationIconGroupProps) {
  const icons = navIcons;
  const location = useLocation();

  const isActive = (iconPath: string, altPath?: string): boolean => {
    if (iconPath === "/") return location.pathname === "/";

    return (
      location.pathname.startsWith(iconPath) ||
      (!!altPath && location.pathname.startsWith(altPath))
    );
  };

  return (
    <HollowSlotButtonGroup className={groupClassName}>
      {icons.map((icon) => (
        <HollowSlotButton
          className={buttonClassName}
          active={isActive(icon.path)}
          key={icon.name}
        >
          <p onClick={() => !!icon.onClick && icon.onClick()}>{icon.name}</p>
        </HollowSlotButton>
      ))}
    </HollowSlotButtonGroup>
  );
}
