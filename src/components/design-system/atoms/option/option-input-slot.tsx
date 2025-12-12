import { useAutoWidth } from "@/hooks/UI/useAutoInputWidth.tsx";
import { useImperativeHandle } from "react";

type OptionInputSlotProps = {
  value: string;
  onChange: (value: string) => void;
  onBackspaceIfEmpty?: () => void;
  onTokenFinished?: () => void;
  ref: any;
};

export function OptionInputSlot({
  value,
  onChange,
  onBackspaceIfEmpty,
  onTokenFinished,
  ref,
}: OptionInputSlotProps) {
  const { spanRef, inputRef } = useAutoWidth(value);

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && value === "") {
      e.preventDefault();
      onBackspaceIfEmpty?.();
    }
  };

  return (
    <span className="inline-block code align-baseline relative">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          onTokenFinished?.();
        }}
        onKeyDown={handleKeyDown}
        className="bg-ludoGrayDark rounded-lg h-7 text-white text-md mx-0.5 text-center px-1 outline-none"
      />
      <span
        ref={spanRef}
        className="absolute invisible whitespace-pre text-md px-1"
      >
        {value || "  "}
      </span>
    </span>
  );
}
