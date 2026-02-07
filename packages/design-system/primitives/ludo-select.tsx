import {
  Select,
  SelectContent,
  SelectItem,
} from "@ludocode/external/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import type { ReactNode } from "react";

type LudoSelectProps = {
  index: number;
  count: number;
  children: ReactNode;
  onChange: ((oldIndex: number, newIndex: number) => void) | null;
  prefix?: string;
};

export function LudoSelectLegacy({
  index,
  count,
  children,
  onChange,
  prefix = "#",
}: LudoSelectProps) {
  return (
    <Select
      value={String(index)}
      onValueChange={(value) => onChange?.(index, Number(value))}
    >
      {children}
      <SelectContent className="bg-ludo-surface">
        <SelectGroup>
          {Array.from({ length: count }).map((_, i) => (
            <SelectItem
              className="border-2 border-ludo-accent-muted hover:cursor-pointer bg-ludo-background my-2 text-white"
              key={i}
              value={String(i)}
            >
              {prefix} {i}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
