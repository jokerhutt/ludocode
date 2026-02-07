import { cn } from "@ludocode/design-system/cn-utils";
import { Spinner } from "@ludocode/external/ui/spinner";
import { forwardRef } from "react";

export type LudoButtonVariant = "default" | "alt" | "white" | "danger";

type LudoButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  selected?: boolean;
  shadow?: boolean;
  clickable?: boolean;
  isLoading?: boolean;
  variant?: LudoButtonVariant;
  disabled?: boolean;
  childClass?: string;
};

export const LudoButton = forwardRef<HTMLButtonElement, LudoButtonProps>(
  (
    {
      children,
      className,
      clickable = true,
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
    const variantStyles: Record<LudoButtonVariant, string> = {
      default: "bg-ludo-surface text-white",
      alt: "bg-ludo-accent text-white",
      white: "bg-white text-black",
      danger: "bg-ludo-danger text-white",
    };

    const disabledVariantStyles: Record<LudoButtonVariant, string> = {
      default: "bg-ludo-surface/50 text-white/50",
      alt: "bg-ludo-accent/40 text-white/50",
      white: "bg-white/50 text-black/50",
      danger: "bg-ludo-danger/50 text-white/50",
    };

    const shadowMap: Record<LudoButtonVariant, string> = {
      default: "shadow-[0_7px_0_#262E57]",
      alt: "shadow-[0_7px_0_#624FA0]",
      white: "shadow-[0_7px_0_#D1D5DB]",
      danger: "shadow-[0_7px_0_#C85A5A]",
    };

    const disabledShadowStyles: Record<LudoButtonVariant, string> = {
      default: "shadow-[0_5px_0_#262E57]/50",
      alt: "shadow-[0_5px_0_#624FA0]/50",
      white: "shadow-[0_5px_0_rgba(0,0,0,0.06)]",
      danger: "shadow-[0_5px_0_#C85A5A]/50",
    };

    const clickableStyles = clickable ? "hover:cursor-pointer" : "";
    const clickableShadowStyle =
      clickable && shadow ? "active:translate-y-1 active:shadow-none" : "";

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "h-10 w-full rounded-lg flex justify-center items-center gap-3",
          clickableStyles,
          shadow
            ? `${disabled || isLoading ? disabledShadowStyles[variant] : shadowMap[variant]}`
            : "",
          clickableShadowStyle,
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
