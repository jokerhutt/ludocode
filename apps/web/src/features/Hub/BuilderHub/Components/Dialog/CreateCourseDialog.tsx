import { useState } from "react";
import { Dialog, DialogHeader } from "../../../../../../../../packages/external/ui/dialog.tsx";
import { Input } from "../../../../../../../../packages/external/ui/input.tsx";
import { Button } from "../../../../../../../../packages/external/ui/button.tsx";
import { useCreateCourse } from "@/hooks/Queries/Mutations/useCreateCourse.tsx";
import { InputWrapper } from "@/features/Builder/Components/Input/input-wrapper.tsx";
import { InputTitle } from "@/features/Builder/Components/Input/input-title.tsx";
import { Spinner } from "../../../../../../../../packages/external/ui/spinner.tsx";
import { DialogWrapper } from "../../../../../../../../packages/design-system/widgets/ludo-dialog.tsx";

type CreateCourseDialogProps = {
  open: boolean;
  close: () => void;
  hash: string;
};

export function CreateCourseDialog({
  open,
  close,
  hash,
}: CreateCourseDialogProps) {
  const closeModal = () => {
    close();
    setCourseName("Untitled Course");
  };

  const createCourseMutation = useCreateCourse(() => close());

  const [courseName, setCourseName] = useState<string>("Untitled Course");

  const submitProject = () => {
    if (courseName == null || courseName.length <= 0) return;

    createCourseMutation.mutate({
      courseTitle: courseName,
      requestHash: hash,
    });
  };

  const isPending = createCourseMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={() => closeModal()}>
      <DialogWrapper>
        <DialogHeader className="text-white code font-bold text-xl">
          New Course
        </DialogHeader>

        <InputWrapper>
          <InputTitle>Course Name</InputTitle>
          <Input
            placeholder={courseName}
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </InputWrapper>

        <div className="py-2 flex justify-center items-center">
          <Button
            variant={isPending ? "disabled" : "default"}
            onClick={() => submitProject()}
            className="w-full"
          >
            Create Project
            {isPending && <Spinner className="text-ludoLightPurple" />}
          </Button>
        </div>
      </DialogWrapper>
    </Dialog>
  );
}
