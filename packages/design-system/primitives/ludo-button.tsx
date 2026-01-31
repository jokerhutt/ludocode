import { cn } from "@ludocode/design-system/cn-utils";
import { Spinner } from "@ludocode/external/ui/spinner";
import { forwardRef } from "react";

type Variant = "default" | "alt" | "white";

type LudoButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  selected?: boolean;
  shadow?: boolean;
  isLoading?: boolean;
  variant?: Variant;
  disabled?: boolean;
  childClass?: string;
};

export const LudoButton = forwardRef<HTMLButtonElement, LudoButtonProps>(
  (
    {
      children,
      className,
      shadow = true,
      isLoading = false,
      selected = false,
      variant = "default",
      childClass,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const variantStyles: Record<Variant, string> = {
      default: "bg-ludo-surface text-white",
      alt: "bg-ludo-accent text-white",
      white: "bg-white text-black",
    };

    const disabledVariantStyles: Record<Variant, string> = {
      default: "bg-ludo-surface/50 text-white/50",
      alt: "bg-ludo-accent/40 text-white/50",
      white: "bg-white/50 text-black/50",
    };

    const shadowMap: Record<Variant, string> = {
      default: "shadow-[0_7px_0_#262E57]",
      alt: "shadow-[0_7px_0_#624FA0]",
      white: "shadow-[0_7px_0_#D1D5DB]",
    };

    const disabledShadowStyles: Record<Variant, string> = {
      default: "shadow-[0_5px_0_#262E57]/50",
      alt: "shadow-[0_5px_0_#624FA0]/50",
      white: "shadow-[0_5px_0_rgba(0,0,0,0.06)]",
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "h-10 w-full rounded-lg flex justify-center items-center gap-3 hover:cursor-pointer",
          shadow
            ? `${disabled || isLoading ? disabledShadowStyles[variant] : shadowMap[variant]} active:translate-y-1 active:shadow-none`
            : "",
          `${disabled || isLoading ? disabledVariantStyles[variant] : variantStyles[variant]}`,
          className,
        )}
        {...props}
      >
        {!isLoading ? children : <Spinner className="text-ludo-accent-muted" />}
      </button>
    );
  },
);
