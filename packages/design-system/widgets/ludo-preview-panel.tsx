import { cn } from "@ludocode/design-system/cn-utils";
import type { ReactNode } from "react";

type LudoPreviewPanelRootProps = {
  children: ReactNode;
  className?: string;
};

function LudoPreviewPanelRoot({
  children,
  className,
}: LudoPreviewPanelRootProps) {
  return (
    <div
      className={cn(
        "flex rounded-lg min-h-0 text-white border-3 border-ludo-border h-full flex-col w-full",
        className,
      )}
    >
      {children}
    </div>
  );
}

function LudoPreviewPanelHeader({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-between border-b-3 border-b-ludo-border h-14 px-4 py-2 items-center">
      {children}
    </div>
  );
}

function LudoPreviewPanelContent({
  children,
  className,
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  variant?: "default" | "alt";
}) {
  const variantStyle =
    variant == "default" ? "bg-ludo-surface" : "bg-ludo-background";

  return (
    <div
      className={cn(
        "w-full flex h-full overflow-y-auto scrollbar-ludo-accent min-h-0 p-4  flex-col",
        variantStyle,
        className,
      )}
    >
      {children}
    </div>
  );
}

function LudoPreviewPanelFooter({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-between border-t-3 border-t-ludo-border text-ludoAltText h-14 px-4 py-2 items-center">
      {children}
    </div>
  );
}

export const LudoPreviewPanel = Object.assign(LudoPreviewPanelRoot, {
  Header: LudoPreviewPanelHeader,
  Content: LudoPreviewPanelContent,
  Footer: LudoPreviewPanelFooter,
});
