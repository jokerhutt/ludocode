import type { CurriculumDraftLessonForm } from "@ludocode/types";
import { LudoInput } from "@ludocode/design-system/primitives/input";
import { useEffect } from "react";

type ClozeGapAnswersProps = {
  form: any;
  exerciseIndex: number;
  gapCount: number;
};

export function ClozeGapAnswers({
  form,
  exerciseIndex,
  gapCount,
}: ClozeGapAnswersProps) {
  useEffect(() => {
    const current =
      (form.state.values.exercises as CurriculumDraftLessonForm["exercises"])[
        exerciseIndex
      ]?.correctOptions ?? [];
    if (current.length === gapCount) return;
    const synced = Array.from(
      { length: gapCount },
      (_, i) =>
        current[i] ?? {
          content: "",
          answerOrder: i + 1,
          exerciseOptionId: crypto.randomUUID(),
        },
    );
    form.setFieldValue(`exercises[${exerciseIndex}].correctOptions`, synced);
  }, [gapCount, exerciseIndex, form]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-emerald-400">Gap Answers</p>
        <p className="text-xs text-ludoAltText/60">
          {gapCount} {gapCount === 1 ? "gap" : "gaps"} detected
        </p>
      </div>

      {gapCount === 0 ? (
        <p className="text-xs text-ludoAltText/50 py-2">
          Add ___ to your prompt to create gaps
        </p>
      ) : (
        <form.Field
          name={`exercises[${exerciseIndex}].correctOptions`}
          mode="array"
          children={(correctField: {
            state: {
              value: { exerciseOptionId: string; content: string }[];
            };
          }) => (
            <div className="flex flex-col gap-2">
              {correctField.state.value
                .slice(0, gapCount)
                .map(
                  (
                    option: { exerciseOptionId: string; content: string },
                    i: number,
                  ) => (
                    <div
                      key={option.exerciseOptionId}
                      className="flex items-center gap-2"
                    >
                      <div className="w-6 h-6 shrink-0 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <span className="text-xs text-emerald-400">
                          {i + 1}
                        </span>
                      </div>
                      <form.Field
                        name={`exercises[${exerciseIndex}].correctOptions[${i}].content`}
                        children={(field: {
                          state: { value: unknown };
                          handleChange: (v: string) => void;
                        }) => (
                          <LudoInput
                            value={String(field.state.value ?? "")}
                            setValue={(v: string) => field.handleChange(v)}
                            placeholder={`Gap ${i + 1} answer`}
                          />
                        )}
                      />
                    </div>
                  ),
                )}
            </div>
          )}
        />
      )}
    </div>
  );
}
