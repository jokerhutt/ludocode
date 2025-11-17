import { courseFormOpts, withForm } from "@/form/formKit";
import type { OptionSnap } from "@/Types/Snapshot/SnapshotTypes";
import { ExerciseOptionsDnDContainer } from "../DnD/ExerciseOptionsDnDContainer";

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
