import type { ReactNode } from "react";
import type { ExercisePhase } from "../../../features/Tutorial/TutorialFooter.tsx";

type LessonFooterProps = {
  children: ReactNode;
  bgColor?: string;
  phase: ExercisePhase
};

export function LessonFooter({
  children,
  bgColor = "bg-ludoGrayLight",
  phase
}: LessonFooterProps) {

  const feedbackStyle = phase == "DEFAULT" ? "" : phase == "CORRECT" ? " border-t border-t-green-300" : "border-t border-t-red-600" 

  return (
    <footer className={`col-span-full grid grid-cols-12 min-h-24 ${feedbackStyle} ${bgColor}`}>
      {children}
    </footer>
  );
}
