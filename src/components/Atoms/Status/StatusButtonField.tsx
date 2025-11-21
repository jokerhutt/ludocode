import {
  type ValidationButtonStatus,
} from "@/components/Atoms/Button/StatusButton";

type StatusButtonProps = { hasError: boolean };

export function StatusButtonField({ hasError }: StatusButtonProps) {
  const status: ValidationButtonStatus = hasError ? "error" : "default";

  const statusColor = {
    default: "bg-ludoGrayDark",
    ok: "bg-green-400",
    error: "bg-red-400",
  };

  console.log(hasError);

  return (
    <div
      className={`h-6 w-6 hover:cursor-pointer rounded-full ${statusColor[status]}`}
    />
  );
}
