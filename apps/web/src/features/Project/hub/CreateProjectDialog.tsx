import { DialogTitle } from "@ludocode/external/ui/dialog.tsx";
import { useState, type ReactNode } from "react";
import { useCreateProject } from "@/hooks/Queries/Mutations/useCreateProject.tsx";
import { Spinner } from "@ludocode/external/ui/spinner.tsx";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog.tsx";
import { InputWrapper } from "@ludocode/design-system/primitives/input.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import type { LanguageMetadata } from "@ludocode/types";

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
    setProjectLanguage(null);
    setProjectName("Untitled Project");
  };

  const createProjectMutation = useCreateProject(() => close());

  const possibleOptions = useSuspenseQuery(qo.languages()).data;
  const [projectName, setProjectName] = useState<string>("Untitled Project");
  const [projectLanguage, setProjectLanguage] =
    useState<LanguageMetadata | null>(null);

  const submitProject = () => {
    if (isSubmitLoading) return;
    if (projectName == null || projectName.length <= 0) return;
    if (projectLanguage == null) return;

    createProjectMutation.mutate({
      projectName: projectName,
      projectLanguageId: projectLanguage.languageId,
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
          {possibleOptions.map((option: LanguageMetadata) => (
            <LudoButton
              data-testid={`create-project-language-option-${option.name}`}
              onClick={() => setProjectLanguage(option)}
              variant={projectLanguage == option ? "alt" : "white"}
            >
              {option.name}
            </LudoButton>
          ))}
        </div>
      </InputWrapper>

      <div className="py-2 mt-2 flex gap-2 justify-center items-center">
        <LudoButton
          data-testid={`create-project-button`}
          disabled={isSubmitLoading}
          variant="alt"
          onClick={() => submitProject()}
          className="w-full flex"
        >
          Create Project
          {isSubmitLoading && <Spinner className="text-ludo-accent-muted" />}
        </LudoButton>
      </div>
    </LudoDialog>
  );
}
