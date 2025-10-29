import { HollowSlot } from "../../../components/Atoms/Slot/HollowSlot";
import { useFieldContext } from "../../../form/formKit";

type ExerciseOptionInputFieldProps = {};

export function ExerciseOptionInputField({}: ExerciseOptionInputFieldProps) {
  const field = useFieldContext<string>();

  const val = field.state.value ?? "";
  const ph = "…";

  

  return (
    <HollowSlot padding="px-3 py-0.5 w-full border border-ludoLightPurple">
      <textarea
        className="outline-none text-md w-full border-none p-2"
        placeholder={ph}
        value={val}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </HollowSlot>
  );
}
