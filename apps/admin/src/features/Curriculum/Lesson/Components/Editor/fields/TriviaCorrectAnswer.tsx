import { LudoInput } from "@ludocode/design-system/primitives/input";

type TriviaCorrectAnswerProps = {
  form: any;
  exerciseIndex: number;
};

export function TriviaCorrectAnswer({
  form,
  exerciseIndex,
}: TriviaCorrectAnswerProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-emerald-400">Correct Answer</p>
      <form.Field
        name={`exercises[${exerciseIndex}].correctOptions[0].content`}
        children={(field: {
          state: { value: unknown };
          handleChange: (v: string) => void;
        }) => (
          <LudoInput
            value={String(field.state.value ?? "")}
            setValue={(v: string) => field.handleChange(v)}
            placeholder="The correct answer"
          />
        )}
      />
    </div>
  );
}
