import { cn } from "@/components/utils";
import { HeroIcon } from "../Icons/HeroIcon";

type ExitButtonProps = {
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
};

export function ExitButton({
  onClick,
  className,
  iconClassName,
}: ExitButtonProps) {
  return (
    <div
      onClick={() => onClick?.()}
      className={cn(
        "p-2 rounded-full hover:cursor-pointer hover:bg-ludoGrayDark/50",
        className
      )}
    >
      <HeroIcon
        iconName="XMarkIcon"
        className={cn("text-white h-6 ", iconClassName)}
      />
    </div>
  );
}
