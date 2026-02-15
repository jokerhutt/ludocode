import { LudoInput } from "@ludocode/design-system/primitives/input";
import { ShadowLessButton } from "@ludocode/design-system/primitives/ShadowLessButton.tsx";
import { X } from "lucide-react";

type AnalyzeCorrectOptionsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  exerciseIndex: number;
};

export function AnalyzeCorrectOptions({
  form,
  exerciseIndex,
}: AnalyzeCorrectOptionsProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-emerald-400">Correct Options</p>
        <form.Field
          name={`exercises[${exerciseIndex}].correctOptions`}
          mode="array"
          children={(correctField: {
            state: { value: { exerciseOptionId: string }[] };
            pushValue: (v: {
              content: string;
              answerOrder: number;
              exerciseOptionId: string;
            }) => void;
          }) => (
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
        children={(correctField: {
          state: {
            value: { exerciseOptionId: string; content: string }[];
          };
          removeValue: (i: number) => void;
        }) => (
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
                  children={(field: {
                    state: { value: unknown };
                    handleChange: (v: string) => void;
                  }) => (
                    <LudoInput
                      value={String(field.state.value ?? "")}
                      setValue={(v: string) => field.handleChange(v)}
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
  );
}
