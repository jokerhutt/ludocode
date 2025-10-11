import { useAutoWidth } from "../../Hooks/Exercise/useAutoInputWidth";

type SelectionOptionButton = {
    value: string;
    onChange: (value: string) => void;
}

export function SelectionOptionButton({value, onChange}: SelectionOptionButton) {

  const {spanRef, inputRef} = useAutoWidth(value);  

  return (
    <span className="inline-block align-baseline relative">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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