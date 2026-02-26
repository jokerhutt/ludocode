import * as React from "react";
import { cn } from "@ludocode/design-system/cn-utils";
import {
  HeroIcon,
  type IconName,
} from "@ludocode/design-system/primitives/hero-icon";

type IconButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  iconClassName?: string;
  variant?: "large" | "default";
  dataTestId?: string;
  iconName: IconName;
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      iconClassName,
      dataTestId,
      variant = "default",
      iconName,
      ...props
    },
    ref,
  ) => {
    const variantSize = variant === "large" ? "h-6 w-6" : "h-4 w-4";

    return (
      <button
        ref={ref}
        data-testid={dataTestId}
        type="button"
        className={cn(
          "p-1 hover:bg-ludo-accent-muted/60 hover:cursor-pointer rounded-full",
          className,
        )}
        {...props}
      >
        <HeroIcon
          className={cn("text-white", variantSize, iconClassName)}
          iconName={iconName}
        />
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
