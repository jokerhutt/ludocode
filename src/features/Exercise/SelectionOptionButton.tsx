import { useImperativeHandle } from "react";
import { useAutoWidth } from "../../Hooks/Input/useAutoInputWidth";

type SelectionOptionButton = {
  value: string;
  onChange: (value: string) => void;
  onBackspaceIfEmpty?: () => void;
  onTokenFinished?: () => void;
  ref: any;
};

export function SelectionOptionButton({
  value,
  onChange,
  onBackspaceIfEmpty,
  onTokenFinished,
  ref,
}: SelectionOptionButton) {
  const { spanRef, inputRef } = useAutoWidth(value);

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && value === "") {
      e.preventDefault();
      onBackspaceIfEmpty?.();
    }
  };

  return (
    <span className="inline-block align-baseline relative">
      <input
        ref={inputRef}
        value={value}
        onChange={ (e) => {onChange(e.target.value); onTokenFinished?.()} }
        onKeyDown={handleKeyDown}
        className="bg-ludoGrayDark rounded-lg text-white text-xl text-center px-1 outline-none"
      />
      <span
        ref={spanRef}
        className="absolute invisible whitespace-pre text-xl px-1"
      >
        {value || " "}
      </span>
    </span>
  );
}
