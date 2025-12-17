import { cn } from "@/components/cn-utils.ts";
import { HeroIcon } from "@/components/design-system/atoms/hero-icon/hero-icon.tsx";

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
    <button
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
    </button>
  );
}
