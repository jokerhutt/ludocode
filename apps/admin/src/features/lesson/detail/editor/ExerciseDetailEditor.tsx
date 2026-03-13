import type { CurriculumDraftLessonForm } from "@ludocode/types";
import { withForm } from "@/features/curriculum/types.ts";
import { LudoTrashIcon } from "@ludocode/design-system/primitives/action-icon.tsx";
import { Trash2 } from "lucide-react";
import { ExerciseTypePill } from "../../components/ExerciseTypePill.tsx";
import {
  CurriculumCardContent,
  CurriculumCardFooter,
  CurriculumCardHeader,
} from "@/features/curriculum/components/CurriculumList.tsx";
import { DeleteDialog } from "@ludocode/design-system/templates/dialog/delete-dialog.tsx";
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
  },
  render: function Render({ form, canDelete, exerciseIndex, onDelete }) {
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
                {/* ─── Blocks ─────────────────────────────────────────── */}
                <BlocksEditor form={form} exerciseIndex={exerciseIndex} />

                {/* ─── Divider ────────────────────────────────────────── */}
                <div className="border-t border-ludo-border" />

                {/* ─── Interaction ────────────────────────────────────── */}
                <InteractionEditor
                  form={form}
                  exerciseIndex={exerciseIndex}
                  lessonType={lessonType}
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
