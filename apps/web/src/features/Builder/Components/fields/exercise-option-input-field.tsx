import { Textarea } from "@ludocode/external/ui/textarea";
import { useFieldContext } from "@/constants/form/formKit.ts";

type ExerciseOptionInputFieldProps = { onEmpty: () => void };

export function ExerciseOptionInputField({
  onEmpty,
}: ExerciseOptionInputFieldProps) {
  const field = useFieldContext<string>();

  const val = field.state.value ?? "";
  const ph = "…";

  return (
    <Textarea
      placeholder={ph}
      value={val}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={() => {
        if (!val.trim()) {
          onEmpty();
        }
      }}
      className="w-full resize-none border-none min-h-6 overflow-hidden"
    />
  );
}
