import { cn } from "@ludocode/design-system/cn-utils";
import type { ReactNode } from "react";

type EditorTabProps = { children: ReactNode; className?: string };

export function EditorTab({ children, className }: EditorTabProps) {
  const style = cn(
    "h-full px-8 text-white text-center flex items-center border hover:cursor-pointer border-ludo-accent-muted border-b-ludo-surface bg-ludo-background",
    className
  );

  return <div className={style}>{children}</div>;
}

type HeaderTabProps = {
  text: string;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
};

export function HeaderTab({
  text,
  onClick,
  isActive = false,
  className,
}: HeaderTabProps) {
  const activeStyle = isActive ? "bg-ludo-surface/70" : "";

  return (
    <div
      onClick={() => onClick()}
      className={cn(
        "flex items-center bg-ludo-background/60 justify-center",
        activeStyle,
        className
      )}
    >
      <p>{text}</p>
    </div>
  );
}
