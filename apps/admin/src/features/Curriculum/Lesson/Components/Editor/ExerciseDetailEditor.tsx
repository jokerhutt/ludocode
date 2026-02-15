import type { CurriculumDraftLessonForm } from "@ludocode/types";
import { withForm } from "@/features/Curriculum/types";
import { LudoInput } from "@ludocode/design-system/primitives/input";
import { Textarea } from "@ludocode/external/ui/textarea";
import { useEffect } from "react";
import { ExerciseTypePill } from "./ExerciseTypePill";
import {
  ClozeGapAnswers,
  TriviaCorrectAnswer,
  AnalyzeCorrectOptions,
  DistractorsEditor,
} from "./fields";
import {
  CurriculumPreviewContent,
  CurriculumPreviewFooter,
  CurriculumPreviewHeader,
} from "@/features/Curriculum/Components/CurriculumList";

export const ExerciseDetailEditor = withForm({
  defaultValues: {
    exercises: [] as CurriculumDraftLessonForm["exercises"],
  },
  props: {
    exerciseIndex: 0,
  },
  render: function Render({ form, exerciseIndex }) {
    const exercise = form.state.values.exercises[exerciseIndex];
    if (!exercise) return null;

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

          {exercise.exerciseType === "TRIVIA" &&
            exercise.correctOptions.length > 0 && (
              <TriviaCorrectAnswer form={form} exerciseIndex={exerciseIndex} />
            )}

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

          {exercise.exerciseType === "ANALYZE" && (
            <AnalyzeCorrectOptions form={form} exerciseIndex={exerciseIndex} />
          )}

          {exercise.exerciseType !== "INFO" && (
            <DistractorsEditor form={form} exerciseIndex={exerciseIndex} />
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
