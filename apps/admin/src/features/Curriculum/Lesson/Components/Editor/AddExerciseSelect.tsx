import type { ExerciseType } from "@ludocode/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ludocode/external/ui/select";
import { ExerciseTypePill } from "./ExerciseTypePill";

const EXERCISE_TYPES: ExerciseType[] = ["INFO", "CLOZE", "TRIVIA", "ANALYZE"];

type AddExerciseSelectProps = {
  onAdd: (type: ExerciseType) => void;
};

export function AddExerciseSelect({ onAdd }: AddExerciseSelectProps) {
  return (
    <Select value="" onValueChange={(type) => onAdd(type as ExerciseType)}>
      <SelectTrigger className="w-auto h-auto gap-2 px-3 py-1 rounded-sm bg-ludo-surface border-transparent text-white! text-sm hover:bg-ludo-accent/20 transition-colors focus:ring-0 focus-visible:ring-0">
        <SelectValue placeholder="+ Add Exercise" />
      </SelectTrigger>
      <SelectContent className="bg-ludo-surface border-ludo-border">
        {EXERCISE_TYPES.map((type) => (
          <SelectItem
            key={type}
            value={type}
            className="text-white hover:bg-ludo-background cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ExerciseTypePill type={type} />
              <span>{type}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
