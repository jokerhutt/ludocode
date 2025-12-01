import { courseFormOpts, withForm } from "@/constants/form/formKit";
import type { OptionSnap } from "@/Types/Snapshot/SnapshotTypes";
import { LivePromptPreview } from "../../UI/Wrapper/LivePromptPreview";

export const ExerciseNodeInfoForm = withForm({
  ...courseFormOpts,
  props: {
    lessonIndex: 0 as number,
    moduleIndex: 0 as number,
    exerciseIndex: 0 as number,
  },
  render: ({ form, moduleIndex, lessonIndex, exerciseIndex }) => {
    const exercisePath =
      `modules[${moduleIndex}].lessons[${lessonIndex}].exercises[${exerciseIndex}]` as const;

    const root = form.state.values;
    const exerciseState =
      root.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.exercises?.[
        exerciseIndex
      ];

    if (!exerciseState) return null;

    const exerciseType = exerciseState.exerciseType;

    const hasPrompt = exerciseType !== "TRIVIA";

    return (
      <div className="w-full flex flex-col">
        <div className="text-white grid gap-8 grid-cols-2 items-start">
          <div className="flex flex-col gap-4">
            <form.AppField name={`${exercisePath}.title`}>
              {(f) => <f.FormTitleField name="Title" />}
            </form.AppField>

            <form.AppField name={`${exercisePath}.subtitle`}>
              {(f) => <f.FormTitleField name="Subtitle (Optional)" />}
            </form.AppField>

            {hasPrompt && (
              <form.AppField name={`${exercisePath}.prompt`}>
                {(f) => <f.FormTitleField name="Prompt (use ___ for gaps)" />}
              </form.AppField>
            )}
          </div>

          {hasPrompt && (
            <form.AppField name={`${exercisePath}.prompt`}>
              {(promptField) => (
                <form.AppField name={`${exercisePath}.correctOptions`}>
                  {(correctField) => {
                    const prompt: string = promptField.state.value ?? "";
                    const correctOptions =
                      (correctField.state.value as OptionSnap[] | undefined) ??
                      [];
                    return (
                      <LivePromptPreview
                        prompt={prompt}
                        correctOptions={correctOptions}
                      />
                    );
                  }}
                </form.AppField>
              )}
            </form.AppField>
          )}
        </div>
      </div>
    );
  },
});
