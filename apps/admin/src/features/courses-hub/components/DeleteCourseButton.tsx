import { DeleteDialog } from "@ludocode/design-system/templates/dialog/delete-dialog";
import { TrashIcon } from "lucide-react";
import { useDeleteCourse } from "../hooks/useDeleteCourse";

type DeleteCourseButtonProps = { courseId: string; courseName: string };

export function DeleteCourseButton({
  courseId,
  courseName,
}: DeleteCourseButtonProps) {

  const deleteCourseMutation = useDeleteCourse({
    courseId: courseId,
  });

  const handleDeleteCourse = () => {
    if (deleteCourseMutation.isPending) return;
    deleteCourseMutation.mutate();
  };
  return (
    <DeleteDialog
      targetName={courseName}
      triggerClassName="w-auto z-10"
      asChild
      destructiveConfirmation={{
        confirmationText: `type ${courseName} to confirm`,
        confirmationValue: courseName,
      }}
      onClick={() => handleDeleteCourse()}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex items-end justify-end"
      >
        <TrashIcon className="h-6 w-6 text-ludo-danger rounded-full p-1 hover:cursor-pointer hover:bg-ludo-danger/40" />
      </button>
    </DeleteDialog>
  );
}
