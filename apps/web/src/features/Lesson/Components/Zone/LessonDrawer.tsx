import { cn } from "@ludocode/design-system/cn-utils.ts";
import { useLessonContext } from "@/features/Lesson/Context/useLessonContext.tsx";
import type { ExercisePhase } from "@/features/Lesson/Components/Zone/LessonFooter";

type ResultStyle = {
  border: string;
  text: string;
};

export function LessonFeedbackDrawer() {
  const { phase } = useLessonContext();

  const typeDescriptions: Record<ExercisePhase, ResultStyle> = {
    DEFAULT: { border: "", text: "" },
    SUBMITTED: { border: "border-ludo-surface", text: "Output" },
    CORRECT: { border: "border-ludo-correct", text: "Great work!" },
    INCORRECT: { border: "border-ludo-incorrect", text: "Not quite!" },
  };

  const isVisible = phase !== "DEFAULT" && phase !== "SUBMITTED";

  const { border, text } = typeDescriptions[phase];

  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-0 left-0 right-0 z-10",
        isVisible
          ? "translate-y-0 transition-transform duration-200 ease-out"
          : "translate-y-full",
      )}
    >
      <div
        className={cn(
          "mx-auto lg:h-26 h-30 max-w-screen bg-ludo-background border-t-4",
          border,
        )}
      >
        <div className="py-3 px-8 text-ludo-white-bright">
          <h3 className="lg:text-lg font-medium">{text}</h3>
        </div>
      </div>
    </div>
  );
}
