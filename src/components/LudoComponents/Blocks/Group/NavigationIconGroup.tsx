import { navIcons } from "@/constants/static-data/navIcons";
import { useLocation } from "@tanstack/react-router";
import { HollowSlotButtonGroup } from "./HollowSlotButtonGroup";
import { HollowSlotButton } from "../../Atoms/Button/HollowSlotButton";

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
          onClick={() => !!icon.onClick && icon.onClick()}
        >
          <p>{icon.name}</p>
        </HollowSlotButton>
      ))}
    </HollowSlotButtonGroup>
  );
}
