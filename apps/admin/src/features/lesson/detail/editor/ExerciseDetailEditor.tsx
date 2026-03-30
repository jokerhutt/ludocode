import type { CurriculumDraftLessonForm, LanguageKey } from "@ludocode/types";
import { withForm } from "@/features/curriculum/types.ts";
import { LudoTrashIcon } from "@ludocode/design-system/primitives/action-icon.tsx";
import { Trash2 } from "lucide-react";
import { Textarea } from "@ludocode/external/ui/textarea.tsx";
import { ExerciseTypePill } from "../../components/ExerciseTypePill.tsx";
import {
  CurriculumCardContent,
  CurriculumCardFooter,
  CurriculumCardHeader,
} from "@/features/curriculum/components/CurriculumList.tsx";
import { DeleteDialog } from "@ludocode/design-system/templates/dialog/delete-dialog.tsx";
import { ShadowLessButton } from "@ludocode/design-system/primitives/shadowless-button.tsx";
import { deriveExerciseType } from "@/features/lesson/helpers.ts";
import { InteractionEditor } from "./InteractionEditor.tsx";
import { BlocksEditor } from "./BlocksEditor.tsx";

export const ExerciseDetailEditor = withForm({
  defaultValues: {
    lessonType: "NORMAL" as CurriculumDraftLessonForm["lessonType"],
    exercises: [] as CurriculumDraftLessonForm["exercises"],
  },
  props: {
    exerciseIndex: 0,
    onDelete: undefined as undefined | (() => void),
    canDelete: true,
    courseLanguage: undefined as LanguageKey | undefined,
  },
  render: function Render({
    form,
    canDelete,
    exerciseIndex,
    onDelete,
    courseLanguage,
  }) {
    return (
      <form.Subscribe
        selector={(state) => ({
          exercise: state.values.exercises[exerciseIndex],
          lessonType: state.values.lessonType,
        })}
        children={({ exercise, lessonType }) => {
          if (!exercise) return null;
          const exerciseType = deriveExerciseType(exercise);

          return (
            <div className="flex rounded-lg min-h-0 text-ludo-white-bright border-3 border-ludo-border h-full flex-col w-full">
              <CurriculumCardHeader>
                <div className="flex items-center gap-3">
                  <p className="text-ludo-white-bright font-bold">
                    Exercise {exerciseIndex + 1}
                  </p>
                  <ExerciseTypePill type={exerciseType} />
                </div>
                {onDelete && (
                  <div className="shrink-0">
                    {canDelete ? (
                      <DeleteDialog
                        onClick={() => onDelete()}
                        targetName={`Exercise ${exerciseIndex + 1}`}
                      >
                        <LudoTrashIcon />
                      </DeleteDialog>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="text-ludo-incorrect cursor-not-allowed p-1 rounded"
                        title="At least one exercise is required"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                )}
              </CurriculumCardHeader>

              <CurriculumCardContent className="bg-ludo-background p-6 gap-6">
                {lessonType === "GUIDED" && (
                  <form.Field
                    name={`exercises[${exerciseIndex}].body`}
                    children={(field: any) => {
                      const hasBody =
                        field.state.value !== null &&
                        field.state.value !== undefined;

                      return (
                        <div className="rounded-lg border border-ludo-border bg-ludo-surface p-3 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-ludo-white-bright">
                              Exercise Body (optional)
                            </p>
                            {hasBody ? (
                              <ShadowLessButton
                                type="button"
                                variant="danger"
                                className="w-auto px-4 h-7 text-xs"
                                onClick={() => field.handleChange(null)}
                              >
                                Remove Body
                              </ShadowLessButton>
                            ) : (
                              <ShadowLessButton
                                type="button"
                                className="w-auto px-4 h-7 text-xs"
                                onClick={() => field.handleChange("")}
                              >
                                + Add Body
                              </ShadowLessButton>
                            )}
                          </div>

                          {hasBody && (
                            <Textarea
                              value={String(field.state.value ?? "")}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="Optional markdown instructions shown above exercise steps"
                              className="bg-ludo-background border-transparent text-ludo-white-bright placeholder:text-ludoGray focus:ring-0 focus-visible:ring-0 min-h-24 resize-y"
                            />
                          )}
                        </div>
                      );
                    }}
                  />
                )}

                {/* ─── Blocks ─────────────────────────────────────────── */}
                <BlocksEditor
                  form={form}
                  exerciseIndex={exerciseIndex}
                  courseLanguage={courseLanguage}
                />

                {/* ─── Divider ────────────────────────────────────────── */}
                <div className="border-t border-ludo-border" />

                {/* ─── Interaction ────────────────────────────────────── */}
                <InteractionEditor
                  form={form}
                  exerciseIndex={exerciseIndex}
                  lessonType={lessonType}
                  courseLanguage={courseLanguage}
                />
              </CurriculumCardContent>

              <CurriculumCardFooter>
                <p className="text-xs">
                  {exercise.blocks.length}{" "}
                  {exercise.blocks.length === 1 ? "block" : "blocks"}
                  {exercise.interaction
                    ? ` · ${exercise.interaction.type} interaction`
                    : " · No interaction"}
                </p>
              </CurriculumCardFooter>
            </div>
          );
        }}
      />
    );
  },
});
