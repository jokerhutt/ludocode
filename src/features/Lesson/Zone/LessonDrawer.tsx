import { cn } from "@/components/cn-utils";
import { useLessonContext } from "../Context/useLessonContext";
import type { ExerciseType } from "@/types/Exercise/ExerciseType";
import type { ExercisePhase } from "./LessonFooter";

type ResultStyle = {
  border: string;
  text: string;
};

export function LessonFeedbackDrawer() {
  const { phase } = useLessonContext();

  const typeDescriptions: Record<ExercisePhase, ResultStyle> = {
    DEFAULT: { border: "", text: "" },
    CORRECT: { border: "border-green-400/80", text: "Great work!" },
    INCORRECT: { border: "border-red-400/80", text: "Not quite!" },
  };

  const isVisible = phase !== "DEFAULT";

  const { border, text } = typeDescriptions[phase];

  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-0 left-0 right-0 z-10",
        isVisible
          ? "translate-y-0 transition-transform duration-100 ease-out"
          : "translate-y-full"
      )}
    >
      <div
        className={cn(
          "mx-auto lg:h-26 h-40 max-w-screen bg-codeGray border-t-4 border-green-400/8",
          border
        )}
      >
        <div className="py-4 px-8 text-white">
          <h3 className="text-lg font-medium">{text}</h3>
        </div>
      </div>
    </div>
  );
}
