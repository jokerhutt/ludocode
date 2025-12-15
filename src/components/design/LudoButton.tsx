import { forwardRef } from "react";
import { cn } from "../cn-utils";

type Variant = "default" | "alt";

type LudoButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  selected?: boolean;
  shadow?: boolean;
  variant?: Variant;
};

export const LudoButton = forwardRef<HTMLButtonElement, LudoButtonProps>(
  (
    {
      children,
      className,
      shadow = true,
      selected = false,
      variant = "default",
      ...props
    },
    ref
  ) => {
    const variantStyles: Record<Variant, string> = {
      default: "bg-ludoGrayLight",
      alt: "bg-ludoAltAccent",
    };

    return (
      <div
        className={cn(
          "p-1.5 flex items-center justify-center rounded-lg border-2",
          selected ? "border-ludoLightPurple" : "border-transparent",
          selected && shadow ? "pb-2.5" : ""
        )}
      >
        <button
          ref={ref}
          type="button"
          className={cn(
            "h-20 w-20 rounded-lg inline-flex items-center justify-center",
            variantStyles[variant],
            shadow
              ? "shadow-[0_5px_0_#262E57] active:translate-y-1 active:shadow-none"
              : "",
            className
          )}
          {...props}
        >
          <div className="flex items-center justify-center">{children}</div>
        </button>
      </div>
    );
  }
);
