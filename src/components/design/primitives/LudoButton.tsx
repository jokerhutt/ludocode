import { forwardRef } from "react";
import { cn } from "../../cn-utils.ts";

type Variant = "default" | "alt";

type LudoButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  selected?: boolean;
  shadow?: boolean;
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
      selected = false,
      variant = "default",
      childClass,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const variantStyles: Record<Variant, string> = {
      default: "bg-ludoGrayLight text-white",
      alt: "bg-ludoAltAccent text-white",
    };

    const disabledVariantStyles: Record<Variant, string> = {
      default: "bg-ludoGrayLight/50 text-white/50",
      alt: "bg-ludoAltAccent/40 text-white/50",
    };

    const shadowMap: Record<Variant, string> = {
      default: "shadow-[0_7px_0_#262E57]",
      alt: "shadow-[0_7px_0_#624FA0]",
    };

    const disabledShadowStyles: Record<Variant, string> = {
      default: "shadow-[0_5px_0_#262E57]/50",
      alt: "shadow-[0_5px_0_#624FA0]/50",
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "h-20 w-20 rounded-lg hover:cursor-pointer",
          shadow
            ? `${disabled ? disabledShadowStyles[variant] : shadowMap[variant]} active:translate-y-1 active:shadow-none`
            : "",
          `${disabled ? disabledVariantStyles[variant] : variantStyles[variant]}`,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
