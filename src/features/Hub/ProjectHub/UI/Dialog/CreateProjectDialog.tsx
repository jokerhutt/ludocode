import { DialogWrapper } from "@/components/design-system/blocks/dialog/dialog-wrapper.tsx";
import { Dialog, DialogTitle } from "@/components/external/ui/dialog.tsx";
import { Input } from "@/components/external/ui/input.tsx";
import { Button } from "@/components/external/ui/button.tsx";
import type { LanguageType } from "@/types/Project/LanguageType.ts";
import { useState, type ReactNode } from "react";
import { useCreateProject } from "@/hooks/Queries/Mutations/useCreateProject.tsx";
import { InputWrapper } from "@/components/design-system/blocks/input/input-wrapper.tsx";
import { InputTitle } from "@/components/design-system/blocks/input/input-title.tsx";
import { Spinner } from "@/components/external/ui/spinner.tsx";
import { LudoDialog } from "@/components/design/primitives/LudoDialog";

type CreateProjectDialogProps = {
  open: boolean;
  close: () => void;
  hash: string;
  children: ReactNode;
};

export function CreateProjectDialog({
  open,
  close,
  hash,
  children,
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
    if (isSubmitLoading) return;
    if (projectName == null || projectName.length <= 0) return;
    if (projectLanguage == null) return;

    createProjectMutation.mutate({
      projectName: projectName,
      projectLanguage: projectLanguage,
      requestHash: hash,
    });
  };

  const isSubmitLoading = createProjectMutation.isPending;

  return (
    <LudoDialog
      trigger={children}
      open={open}
      onOpenChange={(next) => {
        if (next) return;
        closeModal();
      }}
    >
      <DialogTitle className="text-white code font-bold text-xl">
        New Project
      </DialogTitle>

      <InputWrapper>
        <InputTitle>Project name</InputTitle>
        <Input
          placeholder={projectName}
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </InputWrapper>

      <InputWrapper>
        <InputTitle>Project type</InputTitle>
        <div className="flex gap-4">
          {possibleOptions.map((option) => (
            <Button
              onClick={() => setProjectLanguage(option)}
              className={`${
                projectLanguage == option ? "border border-ludoLightPurple" : ""
              }`}
            >
              {option}
            </Button>
          ))}
        </div>
      </InputWrapper>

      <div className="py-2 mt-2 flex gap-2 justify-center items-center">
        <Button
          variant={isSubmitLoading ? "disabled" : "default"}
          onClick={() => submitProject()}
          className="w-full flex"
        >
          Create Project
          {isSubmitLoading && <Spinner className="text-ludoLightPurple" />}
        </Button>
      </div>
    </LudoDialog>
  );
}
