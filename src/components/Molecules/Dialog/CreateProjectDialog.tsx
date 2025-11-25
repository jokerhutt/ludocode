import { Dialog } from "@radix-ui/react-dialog";
import { DialogWrapper } from "./DialogWrapper";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { LanguageType } from "@/Types/Playground/LanguageType";
import { useState } from "react";
import { useCreateProject } from "@/Hooks/Queries/Mutations/useCreateProject";

type CreateProjectDialogProps = {
  open: boolean;
  close: () => void;
  hash: string;
};

export function CreateProjectDialog({
  open,
  close,
  hash,
}: CreateProjectDialogProps) {
  const closeModal = () => {
    close();
    setProjectLanguage("python");
    setProjectName("Untitled Project");
  };

  const createProjectMutation = useCreateProject(() => close());

  const possibleOptions: LanguageType[] = ["python", "javascript", "lua"];
  const [projectName, setProjectName] = useState<string>("Untitled Project");
  const [projectLanguage, setProjectLanguage] =
    useState<LanguageType>("python");

  const submitProject = () => {
    if (projectName == null || projectName.length <= 0) return;
    if (projectLanguage == null) return;

    createProjectMutation.mutate({
      projectName: projectName,
      projectLanguage: projectLanguage,
      requestHash: hash,
    });
  };

  return (
    <Dialog open={open} onOpenChange={() => closeModal()}>
      <DialogWrapper>
        <DialogHeader className="text-white code font-bold text-xl">
          New Project
        </DialogHeader>

        <div className="flex text-white w-full gap-4 items-center">
          <p>Project Name</p>
          <Input
            placeholder={projectName}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>

        <div className="flex text-white gap-4 items-center">
          <p>Project Type</p>
          <div className="flex gap-4">
            {possibleOptions.map((option) => (
              <Button
                onClick={() => setProjectLanguage(option)}
                className={`${
                  projectLanguage == option
                    ? "border border-ludoLightPurple"
                    : ""
                }`}
              >
                {option}
              </Button>
            ))}
          </div>
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
