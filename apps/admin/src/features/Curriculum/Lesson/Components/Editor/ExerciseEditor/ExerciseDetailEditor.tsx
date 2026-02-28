import type { CurriculumDraftLessonForm } from "@ludocode/types";
import { withForm } from "@/features/Curriculum/types";
import { LudoTrashIcon } from "@ludocode/design-system/primitives/action-icon";
import { Trash2 } from "lucide-react";
import { ExerciseTypePill } from "../ExerciseTypePill";
import {
  CurriculumPreviewContent,
  CurriculumPreviewFooter,
  CurriculumPreviewHeader,
} from "@/features/Curriculum/Components/CurriculumList";
import { DeleteDialog } from "@ludocode/design-system/templates/dialog/delete-dialog";
import { deriveExerciseType } from "@/features/Curriculum/Lesson/helpers";
import { BlocksEditor, InteractionEditor } from "../fields";

export const ExerciseDetailEditor = withForm({
  defaultValues: {
    exercises: [] as CurriculumDraftLessonForm["exercises"],
  },
  props: {
    exerciseIndex: 0,
    onDelete: undefined as undefined | (() => void),
    canDelete: true,
  },
  render: function Render({ form, canDelete, exerciseIndex, onDelete }) {
    const exercise = form.state.values.exercises[exerciseIndex];
    if (!exercise) return null;

    const exerciseType = deriveExerciseType(exercise);

    return (
      <div className="flex rounded-lg min-h-0 text-white border-3 border-ludo-border h-full flex-col w-full">
        <CurriculumPreviewHeader>
          <div className="flex items-center gap-3">
            <p className="text-white font-bold">Exercise {exerciseIndex + 1}</p>
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
                  className="text-red-400/40 cursor-not-allowed p-1 rounded"
                  title="At least one exercise is required"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          )}
        </CurriculumPreviewHeader>

        <CurriculumPreviewContent className="bg-ludo-background p-6 gap-6">
          {/* ─── Blocks ─────────────────────────────────────────── */}
          <BlocksEditor form={form} exerciseIndex={exerciseIndex} />

          {/* ─── Divider ────────────────────────────────────────── */}
          <div className="border-t border-ludo-border" />

          {/* ─── Interaction ────────────────────────────────────── */}
          <InteractionEditor form={form} exerciseIndex={exerciseIndex} />
        </CurriculumPreviewContent>

        <CurriculumPreviewFooter>
          <p className="text-xs">
            {exercise.blocks.length}{" "}
            {exercise.blocks.length === 1 ? "block" : "blocks"}
            {exercise.interaction
              ? ` · ${exercise.interaction.type} interaction`
              : " · No interaction"}
          </p>
        </CurriculumPreviewFooter>
      </div>
    );
  },
});
