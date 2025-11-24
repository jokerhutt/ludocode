import type { ReactNode } from "react";
import type { ExercisePhase } from "./LessonFooter.tsx";
import { cn } from "@/lib/utils.ts";

type FooterHeightVariant = "thin" | "default"

type AppFooterProps = {
  children: ReactNode;
  variant?: FooterHeightVariant
  className?: string;
};

export function AppFooter({ children, className, variant = "default" }: AppFooterProps) {


  return (
    <footer
      className={cn(
        `col-span-full min-h-20 grid grid-cols-12 bg-ludoGrayLight`,
        className
      )}
    >
      {children}
    </footer>
  );
}
