import { TreeItem } from "@/components/design-system/atoms/tree/tree-item.tsx";
import { Button } from "@/components/external/ui/button";

type AddLessonButtonProps = {addLesson: () => void};

export function AddLessonRow({addLesson}: AddLessonButtonProps) {
  return (
    <TreeItem>
      <Button className="h-8 mt-2" onClick={() => addLesson()}>
        Add Lesson
      </Button>
    </TreeItem>
  );
}
