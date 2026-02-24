import { cn } from "@ludocode/design-system/cn-utils";
import {
  HeroIcon,
  type IconName,
} from "@ludocode/design-system/primitives/hero-icon";

type IconButtonProps = {
  className?: string;
  iconClassName?: string;
  variant?: "large" | "default";
  dataTestId?: string;
  iconName: IconName;
  onClick?: () => void;
};

export function IconButton({
  className,
  iconClassName,
  onClick,
  dataTestId,
  variant = "default",
  iconName,
}: IconButtonProps) {
  const variantSize = variant == "large" ? "h-6 w-6" : "h-4 w-4";

  return (
    <button
      data-testid={dataTestId}
      onClick={() => onClick?.()}
      className={cn(
        "p-1 hover:cursor-pointer hover:bg-ludo-accent-muted/60 rounded-full",
        className
      )}
    >
      <HeroIcon
        className={cn("text-white", variantSize, iconClassName)}
        iconName={iconName}
      />
    </button>
  );
}
