import type { CurriculumDraftLessonForm } from "@ludocode/types";
import { withForm } from "@/features/Curriculum/types";
import { LudoInput } from "@ludocode/design-system/primitives/input";
import { Textarea } from "@ludocode/external/ui/textarea";
import { useEffect } from "react";
import { ExerciseTypePill } from "./ExerciseTypePill";
import { ShadowLessButton } from "@/features/Curriculum/Components/ShadowLessButton";
import { X } from "lucide-react";
import {
  CurriculumPreviewContent,
  CurriculumPreviewFooter,
  CurriculumPreviewHeader,
} from "@/features/Curriculum/Components/CurriculumList";

export const ExerciseDetailEditor = withForm({
  defaultValues: {
    id: "",
    title: "",
    exercises: [] as CurriculumDraftLessonForm["exercises"],
  },
  props: {
    exerciseIndex: 0,
  },
  render: function Render({ form, exerciseIndex }) {
    const exercise = form.state.values.exercises[exerciseIndex];
    if (!exercise) return null;

    // Sync TRIVIA to exactly 1 correct option on mount
    useEffect(() => {
      if (exercise.exerciseType !== "TRIVIA") return;
      const current =
        form.state.values.exercises[exerciseIndex]?.correctOptions ?? [];
      if (current.length === 1) return;
      form.setFieldValue(`exercises[${exerciseIndex}].correctOptions`, [
        current[0] ?? {
          content: "",
          answerOrder: 1,
          exerciseOptionId: crypto.randomUUID(),
        },
      ]);
    }, [exercise.exerciseType, exerciseIndex, form]);

    return (
      <div className="flex rounded-lg min-h-0 text-white border-3 border-ludo-border h-full flex-col w-full">
        <CurriculumPreviewHeader>
          <div className="flex items-center gap-3">
            <p className="text-white font-bold">Exercise {exerciseIndex + 1}</p>
            <ExerciseTypePill type={exercise.exerciseType} />
          </div>
        </CurriculumPreviewHeader>

        <CurriculumPreviewContent className="bg-ludo-background p-6 gap-6">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-ludoAltText">Title</p>
            <form.Field
              name={`exercises[${exerciseIndex}].title`}
              children={(field) => (
                <LudoInput
                  value={String(field.state.value ?? "")}
                  setValue={(value) => field.handleChange(value)}
                  placeholder="Exercise title"
                />
              )}
            />
          </div>

          {/* Subtitle */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-ludoAltText">Subtitle</p>
            <form.Field
              name={`exercises[${exerciseIndex}].subtitle`}
              children={(field) => (
                <LudoInput
                  value={String(field.state.value ?? "")}
                  setValue={(value) => field.handleChange(value)}
                  placeholder="Exercise subtitle"
                />
              )}
            />
          </div>

          {/* Prompt - only for types that use it */}
          {(exercise.exerciseType === "CLOZE" ||
            exercise.exerciseType === "ANALYZE") && (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-ludoAltText">Prompt</p>
              <p className="text-xs text-ludoAltText/60">
                Use ___ for blanks in CLOZE exercises
              </p>
              <form.Field
                name={`exercises[${exerciseIndex}].prompt`}
                children={(field) => (
                  <Textarea
                    value={String(field.state.value ?? "")}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="print(2 ___ 2)"
                    className="bg-ludo-surface border-transparent text-white placeholder:text-ludoGray focus:ring-0 focus-visible:ring-0 min-h-24 resize-none"
                  />
                )}
              />
            </div>
          )}

          {/* Media URL */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-ludoAltText">Media URL</p>
            <form.Field
              name={`exercises[${exerciseIndex}].media`}
              children={(field) => (
                <LudoInput
                  value={String(field.state.value ?? "")}
                  setValue={(value) => field.handleChange(value)}
                  placeholder="https://..."
                />
              )}
            />
          </div>

          {/* TRIVIA — single correct answer */}
          {exercise.exerciseType === "TRIVIA" &&
            exercise.correctOptions.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-emerald-400">Correct Answer</p>
                <form.Field
                  name={`exercises[${exerciseIndex}].correctOptions[0].content`}
                  children={(field) => (
                    <LudoInput
                      value={String(field.state.value ?? "")}
                      setValue={(v) => field.handleChange(v)}
                      placeholder="The correct answer"
                    />
                  )}
                />
              </div>
            )}

          {/* CLOZE — gap-matched correct options (reactive to prompt changes) */}
          {exercise.exerciseType === "CLOZE" && (
            <form.Field
              name={`exercises[${exerciseIndex}].prompt`}
              children={(promptField) => {
                const prompt = String(promptField.state.value ?? "");
                const gaps = prompt.split("___").length - 1;
                return (
                  <ClozeGapAnswers
                    form={form}
                    exerciseIndex={exerciseIndex}
                    gapCount={gaps}
                  />
                );
              }}
            />
          )}

          {/* ANALYZE — free-form correct options */}
          {exercise.exerciseType === "ANALYZE" && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-emerald-400">Correct Options</p>
                <form.Field
                  name={`exercises[${exerciseIndex}].correctOptions`}
                  mode="array"
                  children={(correctField) => (
                    <ShadowLessButton
                      type="button"
                      onClick={() =>
                        correctField.pushValue({
                          content: "",
                          answerOrder: correctField.state.value.length + 1,
                          exerciseOptionId: crypto.randomUUID(),
                        })
                      }
                    >
                      + Add
                    </ShadowLessButton>
                  )}
                />
              </div>
              <form.Field
                name={`exercises[${exerciseIndex}].correctOptions`}
                mode="array"
                children={(correctField) => (
                  <div className="flex flex-col gap-2">
                    {correctField.state.value.length === 0 && (
                      <p className="text-xs text-ludoAltText/50 py-2">
                        No correct options yet
                      </p>
                    )}
                    {correctField.state.value.map((option, optIndex) => (
                      <div
                        key={option.exerciseOptionId}
                        className="flex items-center gap-2"
                      >
                        <div className="w-6 h-6 shrink-0 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <span className="text-xs text-emerald-400">
                            {optIndex + 1}
                          </span>
                        </div>
                        <form.Field
                          name={`exercises[${exerciseIndex}].correctOptions[${optIndex}].content`}
                          children={(field) => (
                            <LudoInput
                              value={String(field.state.value ?? "")}
                              setValue={(v) => field.handleChange(v)}
                              placeholder="Option content"
                            />
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => correctField.removeValue(optIndex)}
                          className="shrink-0 p-1.5 rounded-md hover:bg-ludo-surface text-ludoAltText hover:text-red-400 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
          )}

          {/* Distractors — shared for TRIVIA, CLOZE, ANALYZE */}
          {exercise.exerciseType !== "INFO" && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-red-400">Distractors</p>
                <form.Field
                  name={`exercises[${exerciseIndex}].distractors`}
                  mode="array"
                  children={(distractorField) => (
                    <ShadowLessButton
                      type="button"
                      onClick={() =>
                        distractorField.pushValue({
                          content: "",
                          answerOrder: null,
                          exerciseOptionId: crypto.randomUUID(),
                        })
                      }
                    >
                      + Add
                    </ShadowLessButton>
                  )}
                />
              </div>
              <form.Field
                name={`exercises[${exerciseIndex}].distractors`}
                mode="array"
                children={(distractorField) => (
                  <div className="flex flex-col gap-2">
                    {distractorField.state.value.length === 0 && (
                      <p className="text-xs text-ludoAltText/50 py-2">
                        No distractors yet
                      </p>
                    )}
                    {distractorField.state.value.map((option, optIndex) => (
                      <div
                        key={option.exerciseOptionId}
                        className="flex items-center gap-2"
                      >
                        <div className="w-6 h-6 shrink-0 rounded-full bg-red-500/20 flex items-center justify-center">
                          <span className="text-xs text-red-400">
                            {optIndex + 1}
                          </span>
                        </div>
                        <form.Field
                          name={`exercises[${exerciseIndex}].distractors[${optIndex}].content`}
                          children={(field) => (
                            <LudoInput
                              value={String(field.state.value ?? "")}
                              setValue={(v) => field.handleChange(v)}
                              placeholder="Distractor content"
                            />
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => distractorField.removeValue(optIndex)}
                          className="shrink-0 p-1.5 rounded-md hover:bg-ludo-surface text-ludoAltText hover:text-red-400 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
          )}
        </CurriculumPreviewContent>

        <CurriculumPreviewFooter>
          {exercise.exerciseType === "INFO" ? (
            <p className="text-xs">No options</p>
          ) : exercise.exerciseType === "CLOZE" ? (
            <form.Field
              name={`exercises[${exerciseIndex}].prompt`}
              children={(promptField) => {
                const gaps =
                  String(promptField.state.value ?? "").split("___").length - 1;
                return (
                  <p className="text-xs">
                    {gaps} {gaps === 1 ? "gap" : "gaps"} ·{" "}
                    {exercise.distractors.length} distractors
                  </p>
                );
              }}
            />
          ) : (
            <p className="text-xs">
              {exercise.correctOptions.length} correct ·{" "}
              {exercise.distractors.length} distractors
            </p>
          )}
        </CurriculumPreviewFooter>
      </div>
    );
  },
});

/* ── Reactive CLOZE gap answers (syncs correctOptions to gap count) ── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ClozeGapAnswers({
  form,
  exerciseIndex,
  gapCount,
}: {
  form: any;
  exerciseIndex: number;
  gapCount: number;
}) {
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
