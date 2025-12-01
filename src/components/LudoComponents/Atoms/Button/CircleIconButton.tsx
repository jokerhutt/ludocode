import { cn } from "@/components/utils";
import { HeroIcon, type IconName } from "../Icons/HeroIcon";

type CircleIconButtonProps = {
  className?: string;
  iconClassName?: string;
  iconName: IconName;
  onClick?: () => void;
};

export function CircleIconButton({
  className,
  iconClassName,
  onClick,
  iconName,
}: CircleIconButtonProps) {
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
