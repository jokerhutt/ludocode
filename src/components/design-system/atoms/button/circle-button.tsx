import { cn } from "@/components/cn-utils.ts";
import { HeroIcon, type IconName } from "@/components/design-system/atoms/hero-icon/hero-icon.tsx";

type CircleButtonProps = {
  className?: string;
  iconClassName?: string;
  iconName: IconName;
  onClick?: () => void;
};

export function CircleButton({
  className,
  iconClassName,
  onClick,
  iconName,
}: CircleButtonProps) {
  return (
    <button
      onClick={() => onClick?.()}
      className={cn(
        "p-1 hover:cursor-pointer hover:bg-ludoLightPurple/80 rounded-full",
        className
      )}
    >
      <HeroIcon className={cn("h-4 w-4", iconClassName)} iconName={iconName} />
    </button>
  );
}
