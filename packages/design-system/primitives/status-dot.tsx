export type ValidationButtonStatus = "default" | "ok" | "error";
type StatusDotProps = { hasError: boolean };

export function StatusDot({ hasError }: StatusDotProps) {
  const status: ValidationButtonStatus = hasError ? "error" : "default";

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
