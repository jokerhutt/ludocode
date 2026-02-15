import { LudoInput } from "@ludocode/design-system/primitives/input";
import { ShadowLessButton } from "@ludocode/design-system/primitives/ShadowLessButton.tsx";
import { X } from "lucide-react";

type DistractorsEditorProps = {
  form: any;
  exerciseIndex: number;
};

export function DistractorsEditor({
  form,
  exerciseIndex,
}: DistractorsEditorProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-red-400">Distractors</p>
        <form.Field
          name={`exercises[${exerciseIndex}].distractors`}
          mode="array"
          children={(distractorField: {
            state: { value: { exerciseOptionId: string }[] };
            pushValue: (v: {
              content: string;
              answerOrder: null;
              exerciseOptionId: string;
            }) => void;
          }) => (
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
        children={(distractorField: {
          state: {
            value: { exerciseOptionId: string; content: string }[];
          };
          removeValue: (i: number) => void;
        }) => (
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
                  <span className="text-xs text-red-400">{optIndex + 1}</span>
                </div>
                <form.Field
                  name={`exercises[${exerciseIndex}].distractors[${optIndex}].content`}
                  children={(field: {
                    state: { value: unknown };
                    handleChange: (v: string) => void;
                  }) => (
                    <LudoInput
                      value={String(field.state.value ?? "")}
                      setValue={(v: string) => field.handleChange(v)}
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
  );
}
