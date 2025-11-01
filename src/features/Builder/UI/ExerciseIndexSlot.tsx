import { uuid } from "@tanstack/react-form";
import { HollowSlot } from "../../../components/Atoms/Slot/HollowSlot";

type ExerciseIndexSlotProps = {
  onClick: () => void;
  active: boolean;
  index: number;
  hasError?: boolean;
};

export function ExerciseIndexSlot({onClick, active, index, hasError}: ExerciseIndexSlotProps) {
  
  const errorStyle = hasError ? "border-red-500" : ""
  
  return (
    <HollowSlot
      key={uuid()}
      onClick={() => onClick()}
      active={active}
      padding={`px-6 py-1 ${errorStyle}`}
    >
      <p className={`${hasError ? "text-red-500" : "text-white"}`}>{index}</p>
    </HollowSlot>
  );
}
