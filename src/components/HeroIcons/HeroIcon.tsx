import * as SolidIcons from "@heroicons/react/24/solid";
import * as OutlineIcons from "@heroicons/react/24/outline";

export type IconName = keyof typeof SolidIcons | keyof typeof OutlineIcons;

type HeroIconProps = {
  iconName: IconName;
  solid?: boolean;
  className?: string;
};

export const HeroIcon = ({
  iconName,
  solid = false,
  className = "h-6 w-6",
}: HeroIconProps) => {
  const IconComponent = solid ? SolidIcons[iconName] : OutlineIcons[iconName];

  if (!IconComponent) {
    console.error(
      `HeroIcon "${iconName}" not found in ${solid ? "solid" : "outline"} set.`
    );
    return null;
  }

  return <IconComponent className={className} />;
};
