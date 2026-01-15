import { DialogTitle } from "@ludocode/external/ui/dialog.tsx";
import type { LanguageType } from "@ludocode/types/Project/LanguageType.ts";
import { useState, type ReactNode } from "react";
import { useCreateProject } from "@/hooks/Queries/Mutations/useCreateProject.tsx";
import { Spinner } from "@ludocode/external/ui/spinner.tsx";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog.tsx";
import { InputWrapper } from "@ludocode/design-system/primitives/input";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";

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
        <div className="flex w-full gap-4">
          {possibleOptions.map((option) => (
            <LudoButton
              onClick={() => setProjectLanguage(option)}
              variant={projectLanguage == option ? "alt" : "white"}
            >
              {option[0].toUpperCase() + option.slice(1)}
            </LudoButton>
          ))}
        </div>
      </InputWrapper>

      <div className="py-2 mt-2 flex gap-2 justify-center items-center">
        <LudoButton
          disabled={isSubmitLoading}
          variant="alt"
          onClick={() => submitProject()}
          className="w-full flex"
        >
          Create Project
          {isSubmitLoading && <Spinner className="text-ludoLightPurple" />}
        </LudoButton>
      </div>
    </LudoDialog>
  );
}
