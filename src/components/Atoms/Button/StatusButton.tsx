export type ValidationButtonStatus = "default" | "ok" | "error";
type StatusButtonProps = { status: ValidationButtonStatus };

export function StatusButton({ status }: StatusButtonProps) {
  const statusColor = {
    default: "bg-ludoGrayDark",
    ok: "bg-green-400",
    error: "bg-red-400",
  };

  return (
    <div
      className={`h-6 w-6 hover:cursor-pointer rounded-full ${statusColor[status]}`}
    />
  );
}
