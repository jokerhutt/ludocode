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
      default: "bg-ludo-surface text-ludo-white-bright",
      alt: "bg-ludo-accent text-ludo-white-bright",
      white: "bg-white text-black",
      danger: "bg-ludo-danger text-ludo-white-bright",
    };

    const disabledVariantStyles: Record<LudoButtonVariant, string> = {
      default: "bg-ludo-surface-dim text-ludo-white-dim",
      alt: "bg-ludo-accent-disabled text-ludo-white-dim",
      white: "bg-ludo-white-dim text-black/50",
      danger: "bg-ludo-danger/50 text-ludo-white-dim",
    };

    const shadowMap: Record<LudoButtonVariant, string> = {
      default: "shadow-ludo-surface",
      alt: "shadow-ludo-accent",
      white: "shadow-[0_7px_0_#D1D5DB]",
      danger: "shadow-ludo-danger",
    };

    const disabledShadowStyles: Record<LudoButtonVariant, string> = {
      default: "shadow-[0_5px_0_#262E57]/50",
      alt: "shadow-[0_5px_0_#3F4FAF]/50",
      white: "shadow-[0_5px_0_rgba(0,0,0,0.06)]",
      danger: "shadow-[0_5px_0_#C85A5A]/50",
    };

    const clickableStyles = disabled
      ? "hover:cursor-not-allowed"
      : clickable
        ? "hover:cursor-pointer"
        : "";
    const clickableShadowStyle =
      clickable && shadow ? "active:translate-y-1 active:shadow-none" : "";

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "transition-[transform] duration-100 transform-gpu will-change-transform touch-action-manipulation",
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
