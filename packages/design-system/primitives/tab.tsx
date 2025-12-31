import { cn } from "@ludocode/design-system/cn-utils";
import type { ReactNode } from "react";

type EditorTabProps = { children: ReactNode; className?: string };

export function EditorTab({ children, className }: EditorTabProps) {
  const style = cn(
    "h-full px-8 text-white text-center flex items-center border hover:cursor-pointer border-ludoLightPurple border-b-ludoGrayLight bg-ludoGrayDark",
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
  const activeStyle = isActive ? "bg-ludoGrayLight/70" : "";

  return (
    <div
      onClick={() => onClick()}
      className={cn(
        "flex items-center bg-ludoGrayDark/60 justify-center",
        activeStyle,
        className
      )}
    >
      <p>{text}</p>
    </div>
  );
}
