import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";
import { DialogWrapper } from "./DialogWrapper";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type CreateCourseDialogProps = { open: boolean, close: () => void };

export function CreateCourseDialog({ open, close }: CreateCourseDialogProps) {
  const closeModal = () => {
    close();
    setCourseName("Untitled Course");
  };

  const [courseName, setCourseName] = useState<string>("Untitled Course");

  const submitProject = () => {
    if (courseName == null || courseName.length <= 0) return;
  };

  return (
    <Dialog open={open} onOpenChange={() => closeModal()}>
      <DialogWrapper>
        <DialogHeader className="text-white code font-bold text-xl">
          New Course
        </DialogHeader>

        <div className="flex text-white w-full gap-4 items-center">
          <p>Course Name</p>
          <Input
            placeholder={courseName}
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>

        <div className="py-2 flex justify-center items-center">
          <Button onClick={() => submitProject()} className="w-full">
            Create Project
          </Button>
        </div>
      </DialogWrapper>
    </Dialog>
  );
}
