import {
  LudoSelect,
  LudoSelectItem,
} from "@ludocode/design-system/primitives/select.tsx";
import type { PistonRuntime } from "@ludocode/types";

type LanguageRuntimeSelectProps = {
  runtimeId: string;
  setRuntimeId: (v: string) => void;
  availableRuntimes: PistonRuntime[];
  errors?: string;
};

export function LanguageRuntimeSelect({
  runtimeId,
  setRuntimeId,
  availableRuntimes,
  errors,
}: LanguageRuntimeSelectProps) {
  return (
    <LudoSelect
      value={runtimeId}
      setValue={setRuntimeId}
      title="Runtime"
      error={errors}
    >
      {availableRuntimes.map((rt) => (
        <LudoSelectItem
          key={`${rt.language}-${rt.version}-${rt.runtime ?? "default"}`}
          value={rt.language}
        >
          <span className="flex items-center gap-2">
            <span>{rt.language}</span>
            <span className="text-xs text-ludo-white">{rt.version}</span>
          </span>
        </LudoSelectItem>
      ))}
    </LudoSelect>
  );
}
