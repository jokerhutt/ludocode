import { XIcon } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "../cn-utils";

type LudoSlideOverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "bottom" | "right";
  children: ReactNode;
};

function LudoSlideOverRoot({
  open,
  onOpenChange,
  side = "bottom",
  children,
}: LudoSlideOverProps) {
  const isBottom = side === "bottom";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 animate-in fade-in duration-200"
          onClick={() => onOpenChange(false)}
        />
      )}

      <div
        className={cn(
          "fixed z-50 bg-ludo-background transition-transform duration-300 ease-out flex flex-col",
          isBottom
            ? "bottom-0 left-0 right-0 rounded-t-2xl max-h-[70dvh]"
            : "top-0 right-0 h-full w-80 rounded-l-2xl",
          isBottom
            ? open
              ? "translate-y-0"
              : "translate-y-full"
            : open
              ? "translate-x-0"
              : "translate-x-full",
        )}
      >
        {children}
      </div>
    </>
  );
}

function Header({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose?: () => void;
}) {
  return (
    <div className="flex flex-col items-center pt-3 pb-2 px-4 shrink-0">
      <div className="w-10 h-1 rounded-full bg-white/20 mb-3" />
      <div className="w-full flex items-center justify-between">
        <div>{children}</div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <XIcon className="w-5 h-5 text-white/50" />
          </button>
        )}
      </div>
    </div>
  );
}

function Content({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-y-auto flex-1 px-4 py-6", className)}>
      {children}
    </div>
  );
}

export const LudoSlideOver = Object.assign(LudoSlideOverRoot, {
  Header,
  Content,
});
