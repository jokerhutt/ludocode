import { forwardRef } from "react";
import { cn } from "../cn-utils";

type Variant = "default" | "alt";

type LudoButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  withRing?: boolean;
  selected?: boolean;
  shadow?: boolean;
  variant?: Variant;
};

export const LudoButton = forwardRef<HTMLButtonElement, LudoButtonProps>(
  (
    {
      children,
      className,
      withRing = true,
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

    const shadowMap: Record<Variant, string> = {
      default: "shadow-[0_5px_0_#262E57]",
      alt: "shadow-[0_5px_0_#624FA0]",
    };

    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg border-2",
          selected ? "border-ludoLightPurple" : "border-transparent",
          withRing ? "p-1.5" : "w-full",
          selected && shadow ? "pb-2.5" : ""
        )}
      >
        <button
          ref={ref}
          type="button"
          className={cn(
            "h-20 w-20 rounded-lg hover:cursor-pointer inline-flex items-center justify-center",
            variantStyles[variant],
            shadow
              ? `${shadowMap[variant]} active:translate-y-1 active:shadow-none`
              : "",
            className
          )}
          {...props}
        >
          <div className="flex items-center text-ludoAltText justify-center">
            {children}
          </div>
        </button>
      </div>
    );
  }
);
