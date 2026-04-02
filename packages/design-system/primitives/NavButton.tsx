import { useIsMobile } from "@ludocode/hooks";
import { cn } from "../cn-utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type NavButtonProps = {
  text?: string;
  active?: boolean;
  testId?: string;
  onClick?: () => void;
  icon?: LucideIcon;
  className?: string;
  children?: ReactNode;
};

export function NavButton({
  text,
  active,
  testId,
  onClick,
  icon: IconComponent,
  className,
  children,
}: NavButtonProps) {
  const isMobile = useIsMobile({});

  return (
    <button
      type="button"
      data-testid={testId}
      onClick={() => onClick?.()}
      className={cn(
        isMobile
          ? "flex flex-col items-center justify-center gap-1 px-1 py-1 min-w-14"
          : "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-150",
        "hover:cursor-pointer text-sm font-medium",
        isMobile
          ? active
            ? "text-ludo-white-bright"
            : "text-ludo-white-dim hover:text-ludo-white-bright"
          : active
            ? "bg-ludo-accent/15 text-ludo-white-bright"
            : "text-ludo-white-dim hover:text-ludo-white-bright hover:bg-white/5",
        className,
      )}
    >
      {children ? (
        children
      ) : (
        <>
          <span
            className={cn(
              isMobile
                ? "flex h-8 w-8 items-center justify-center rounded-md transition-colors"
                : "contents",
              isMobile && (active ? "bg-ludo-accent/20" : "bg-ludo-surface/60"),
            )}
          >
            {IconComponent && (
              <IconComponent
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  active ? "text-ludo-accent" : "text-current",
                )}
              />
            )}
          </span>
          {text && (
            <span
              className={cn(isMobile && "text-[10px] leading-none text-center")}
            >
              {text}
            </span>
          )}
        </>
      )}
    </button>
  );
}
