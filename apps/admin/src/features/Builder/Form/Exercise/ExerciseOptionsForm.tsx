import type { OptionSnap } from "@ludocode/types/Builder/BuilderSnapshotTypes";
import type { ColumnType } from "@/features/Builder/Hooks/useOptionsDragAndDrop.tsx";
import { ExerciseOptionsDnDContainer } from "@/features/Builder/Components/Drag/ExerciseOptionsDnDContainer.tsx";
import { courseFormOpts, withForm } from "@/constants/form/formKit";

export const ExerciseOptionsForm = withForm({
  ...courseFormOpts,
  props: {
    exerciseId: "" as string,
    moduleIndex: 0 as number,
    exerciseIndex: 0 as number,
    lessonIndex: 0 as number,
  },
  render: ({ form, exerciseId, moduleIndex, exerciseIndex, lessonIndex }) => {
    return (
      <form.AppField
        key={exerciseId}
        name={`modules[${moduleIndex}].lessons[${lessonIndex}].exercises[${exerciseIndex}].correctOptions`}
        mode="array"
      >
        {(correctFA) => (
          <form.AppField
            name={`modules[${moduleIndex}].lessons[${lessonIndex}].exercises[${exerciseIndex}].distractors`}
            mode="array"
          >
            {(distrFA) => {
              const correct = correctFA.state.value as OptionSnap[];
              const distractors = distrFA.state.value as OptionSnap[];

              const addValue = ({
                item,
                type,
              }: {
                item: OptionSnap;
                type: "correct" | "distractor";
              }) => {
                if (type === "correct") {
                  correctFA.pushValue(item);
                } else {
                  distrFA.pushValue(item);
                }
              };

              const handleEdit = (
                id: string,
                column: ColumnType,
                value: string
              ) => {
                const field = column === "correct" ? correctFA : distrFA;

                const updated = field.state.value.map((opt) =>
                  opt.exerciseOptionId === id ? { ...opt, content: value } : opt
                );

                field.setValue(updated);
              };

              const removeValue = (
                index: number,
                type: "correct" | "distractor"
              ) => {
                if (type === "correct") {
                  correctFA.removeValue(index);
                } else {
                  distrFA.removeValue(index);
                }
              };

              return (
                <ExerciseOptionsDnDContainer
                  onEdit={handleEdit}
                  addValue={addValue}
                  removeValue={removeValue}
                  correct={correct}
                  distractors={distractors}
                />
              );
            }}
          </form.AppField>
        )}
      </form.AppField>
    );
  },
});
