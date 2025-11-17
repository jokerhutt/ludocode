import { Textarea } from "@/components/ui/textarea";
import { useFieldContext } from "@/form/formKit";

export default function FormTitleField() {
  const field = useFieldContext<string>();
  const value = field.state.value ?? "";
  const error = field.state.meta.errors?.[0]?.message;

  return (
    <div className="flex flex-col w-full">
      <Textarea
        className={`pl-2 text-black min-h-6 py-2 rounded-lg border-2 ${
          error ? "border-red-500" : "border-ludoLightPurple"
        }`}
        value={value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />

      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
