import type { ReactNode } from "react";
import type { ExercisePhase } from "../../../features/Tutorial/TutorialFooter.tsx";

type DefaultFooterProps = {
  children: ReactNode;
  bgColor?: string;
  phase: ExercisePhase;
};

export function DefaultFooter({
  children,
  bgColor = "bg-ludoGrayLight",
  phase,
}: DefaultFooterProps) {
  const feedbackStyle =
    phase == "DEFAULT"
      ? "border-t-2 border-t-ludoGrayLight"
      : phase == "CORRECT"
      ? " border-t-2 border-t-green-300"
      : "border-t-2 border-t-red-600";

  return (
    <footer
      className={`col-span-full grid grid-cols-12 min-h-24 ${feedbackStyle} ${bgColor}`}
    >
      {children}
    </footer>
  );
}
