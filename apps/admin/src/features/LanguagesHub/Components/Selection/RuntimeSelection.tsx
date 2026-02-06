import type { PistonRuntime } from "@ludocode/types";

type RuntimeSelectionProps = {
  pistonId: string;
  setPistonId: (value: string) => void;
  availableRuntimes: PistonRuntime[];
};

export function RuntimeSelect({
  pistonId,
  setPistonId,
  availableRuntimes,
}: RuntimeSelectionProps) {
  return (
    <select
      className="w-full bg-transparent border border-ludo-accent-muted rounded px-2 py-1 text-white"
      value={pistonId}
      onChange={(e) => setPistonId(e.target.value)}
    >
      <option value="">Select runtime</option>

      {availableRuntimes.map((rt) => (
        <option
          key={`${rt.language}-${rt.version}-${rt.runtime ?? "default"}`}
          value={rt.language}
        >
          {rt.language}
        </option>
      ))}
    </select>
  );
}
