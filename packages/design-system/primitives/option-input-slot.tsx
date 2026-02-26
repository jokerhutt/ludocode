import { useAutoWidth } from "@ludocode/hooks";
import { useImperativeHandle } from "react";
import { cn } from "@ludocode/design-system/cn-utils";

type OptionInputSlotProps = {
  value: string;
  onChange: (value: string) => void;
  onBackspaceIfEmpty?: () => void;
  disabled?: boolean;
  onTokenFinished?: () => void;
  ref: any;
};

export function OptionInputSlot({
  value,
  onChange,
  disabled,
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

  const hasValue = value.length > 0;

  return (
    <span className="inline-flex items-center align-baseline relative mx-0.5 sm:mx-1">
      <input
        disabled={disabled}
        ref={inputRef}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          onTokenFinished?.();
        }}
        onKeyDown={handleKeyDown}
        placeholder="·"
        className={cn(
          "rounded-md h-7 text-xs sm:text-sm text-center",
          "px-0.5 sm:px-2",
          "outline-none transition-colors duration-100 font-mono",
          "placeholder:text-white/20",
          hasValue
            ? "bg-ludo-accent/15 text-ludo-accent-muted border border-ludo-accent/30"
            : "bg-white/5 text-white border border-dashed border-white/20 focus:border-ludo-accent-muted/60 focus:bg-ludo-accent/10",
        )}
        style={{ minWidth: hasValue ? undefined : "1.5rem" }}
      />
      <span
        ref={spanRef}
        className="absolute invisible whitespace-pre text-xs sm:text-sm px-0.5 sm:px-2 font-mono"
      >
        {value || "\u00a0"}
      </span>
    </span>
  );
}
