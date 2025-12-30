import { TreeItem } from "@/features/Builder/Components/Tree/tree-item.tsx";
import { Button } from "../../../../../../../packages/external/ui/button.tsx";

type AddLessonButtonProps = { addLesson: () => void };

export function AddLessonRow({ addLesson }: AddLessonButtonProps) {
  return (
    <TreeItem>
      <Button className="h-8 mt-2" onClick={() => addLesson()}>
        Add Lesson
      </Button>
    </TreeItem>
  );
}
