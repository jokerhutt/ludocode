import { getAdminNavIcons } from "@/constants/adminNavIcons";
import { useLocation } from "@tanstack/react-router";
import { NavButton } from "@ludocode/design-system/primitives/NavButton.tsx";

type AdminNavigationIconGroupProps = {};

export function AdminNavigationIconGroup({}: AdminNavigationIconGroupProps) {
  const icons = getAdminNavIcons();

  const location = useLocation();

  const isActive = (iconPath: string): boolean => {
    return location.pathname.startsWith(iconPath);
  };

  return (
    <div className="hidden lg:flex items-center gap-1">
      {icons.map((icon) => (
        <NavButton
          key={icon.name}
          text={icon.name}
          active={isActive(icon.path)}
          onClick={() => icon.onClick?.()}
        />
      ))}
    </div>
  );
}
