import { useFieldContext } from "../../../form/formKit";

export default function TitleField({
  deletable,
  onDelete,
}: {
  deletable?: boolean;
  onDelete?: () => void;
}) {
  const field = useFieldContext<string>();

  const isEmpty = !(field.state.value ?? "").trim();
  return (
    <>
      <input
        className="pl-2 rounded-lg border-2 border-ludoLightPurple py-0.5"
        placeholder={field.state.value}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {deletable && (
        <button
          onClick={() => {
            if (isEmpty) {
              onDelete?.()
            }
          }}
          disabled={!isEmpty}
          className={
            isEmpty
              ? "flex items-center justify-center hover:cursor-pointer hover:bg-ludoGrayLight/80 rounded-md border-2 border-ludoLightPurple px-2"
              : "flex items-center justify-center rounded-md border-2 hover:cursor-not-allowed hover:bg-ludoGrayLight/40 border-ludoLightPurple/40 px-2"
          }
        >
          x
        </button>
      )}
    </>
  );
}
