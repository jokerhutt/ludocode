import { uuid } from "@tanstack/react-form";
import { HollowSlot } from "../../../components/Atoms/Slot/HollowSlot";

type ExerciseIndexSlotProps = {
  onClick: () => void;
  active: boolean;
  index: number;
};

export function ExerciseIndexSlot({onClick, active, index}: ExerciseIndexSlotProps) {
  return (
    <HollowSlot
      key={uuid()}
      onClick={() => onClick()}
      active={active}
      padding="px-6 py-1"
    >
      <p className="text-white">{index}</p>
    </HollowSlot>
  );
}
