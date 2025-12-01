import { TreeItem } from "@/components/LudoComponents/Atoms/Tree/TreeItem";
import { Button } from "@/components/ui/button";

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
