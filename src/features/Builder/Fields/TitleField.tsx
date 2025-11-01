import { Textarea } from "@/components/ui/textarea";
import { useFieldContext } from "../../../form/formKit";

export default function TitleField({
  deletable,
  arrayLength,
  onDelete,
}: {
  arrayLength: number;
  deletable?: boolean;
  onDelete?: () => void;
}) {
  const field = useFieldContext<string>();
  const value = field.state.value ?? "";
  const isEmpty = !value.trim();
  const canDelete = isEmpty && arrayLength > 1;
  const error = field.state.meta.errors?.[0]?.message;

  return (
    <div className="flex flex-col w-full">
      <Textarea
        className={`pl-2 text-white min-h-6 py-2 rounded-lg border-2 ${
          error ? "border-red-500" : "border-ludoLightPurple"
        }`}
        placeholder="Enter title"
        value={value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />

      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}

      {deletable && (
        <button
          onClick={() => {
            if (canDelete) onDelete?.();
          }}
          disabled={!canDelete}
          className={`flex items-center justify-center rounded-md border-2 px-2 ${
            canDelete
              ? "hover:bg-ludoGrayLight/80 border-ludoLightPurple"
              : "cursor-not-allowed bg-ludoGrayLight/40 border-ludoLightPurple/40"
          }`}
        >
          x
        </button>
      )}
    </div>
  );
}
