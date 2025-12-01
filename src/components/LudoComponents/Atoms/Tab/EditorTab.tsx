import { cn } from "@/components/utils";
import type { ReactNode } from "react";

type EditorTabProps = { children: ReactNode; className?: string };

export function EditorTab({ children, className }: EditorTabProps) {
  const style = cn(
    "h-full px-8 text-white text-center flex items-center border hover:cursor-pointer border-ludoLightPurple border-b-ludoGrayLight bg-ludoGrayDark",
    className
  );

  return <div className={style}>{children}</div>;
}
