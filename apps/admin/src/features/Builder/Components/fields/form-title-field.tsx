import { Textarea } from "@ludocode/external/ui/textarea";
import { cn } from "@ludocode/design-system/cn-utils";
import { useFieldContext } from "@/constants/form/formKit";

type FormTitleFieldProps = {
  name?: string;
  className?: string;
};

export default function FormTitleField({
  name,
  className,
}: FormTitleFieldProps) {
  const field = useFieldContext<string>();
  const value = field.state.value ?? "";
  const error = field.state.meta.errors?.[0]?.message;

  return (
    <div className="flex flex-col w-full">
      {name && <p className="text-sm text-ludoAltText pb-0.5">{name}</p>}

      <Textarea
        className={cn(
          "pl-2 text-white min-h-6 py-2 rounded-lg border-2",
          error ? "border-red-500" : "border-ludoLightPurple",
          className
        )}
        value={value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />

      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
