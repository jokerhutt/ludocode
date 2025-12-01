import { useState } from "react";
import { DialogWrapper } from "../DialogWrapper";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateCourse } from "@/Hooks/Queries/Mutations/useCreateCourse";
import { InputWrapper } from "../../Input/InputWrapper";
import { InputTitle } from "../../Input/InputTitle";
import { Spinner } from "@/components/ui/spinner";

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
