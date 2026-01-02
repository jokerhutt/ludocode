import { useState } from "react";
import { InputWrapper } from "@/features/Builder/Components/Input/input-wrapper.tsx";
import { InputTitle } from "@/features/Builder/Components/Input/input-title.tsx";
import { useCreateCourse } from "@/hooks/Queries/Mutations/useCreateCourse";
import { Dialog, DialogHeader } from "@ludocode/external/ui/dialog";
import { DialogWrapper } from "@ludocode/design-system/widgets/ludo-dialog";
import { Spinner } from "@ludocode/external/ui/spinner";
import { Button } from "@ludocode/external/ui/button";
import { Input } from "@ludocode/external/ui/input";

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
