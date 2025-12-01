import { Select, SelectContent, SelectItem } from "@/components/external/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import type { ReactNode } from "react";

type OrderSelectorProps = {
  index: number;
  count: number;
  children: ReactNode;
  onChange: ((oldIndex: number, newIndex: number) => void) | null;
  prefix?: string;
};

export function OrderSelector({
  index,
  count,
  children,
  onChange,
  prefix = "#",
}: OrderSelectorProps) {
  return (
    <Select
      value={String(index)}
      onValueChange={(value) => onChange?.(index, Number(value))}
    >
      {children}
      <SelectContent className="bg-ludoGrayLight">
        <SelectGroup>
          {Array.from({ length: count }).map((_, i) => (
            <SelectItem className="border-2 border-ludoLightPurple hover:cursor-pointer bg-ludoGrayDark my-2 text-white" key={i} value={String(i)}>
              {prefix} {i}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
