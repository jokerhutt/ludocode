import { DialogTitle } from "@ludocode/external/ui/dialog.tsx";
import { useState, type ReactNode } from "react";
import { useCreateProject } from "@/queries/mutations/useCreateProject.tsx";
import { Spinner } from "@ludocode/external/ui/spinner.tsx";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries.ts";
import {
  LudoSelect,
  LudoSelectItem,
} from "@ludocode/design-system/primitives/select.tsx";
import { CustomIcon, stringToCustomIcon } from "@ludocode/design-system/primitives/custom-icon";

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
    setSelectedLanguageId("");
    setProjectName("Untitled project");
  };

  const createProjectMutation = useCreateProject(() => close());

  const possibleOptions = useSuspenseQuery(qo.languages()).data;
  const [projectName, setProjectName] = useState<string>("Untitled project");
  const [selectedLanguageId, setSelectedLanguageId] = useState<string>("");

  const submitProject = () => {
    if (isSubmitLoading) return;
    if (projectName == null || projectName.length <= 0) return;
    if (!selectedLanguageId) return;

    createProjectMutation.mutate({
      projectName: projectName,
      projectLanguageId: Number(selectedLanguageId),
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
      <DialogTitle className="text-ludo-white-bright font-bold text-xl">
        New Project
      </DialogTitle>

      <div className="flex flex-col gap-6 mt-4">
        <LudoSelect
          
          variant="dark"
          title="Language"
          value={selectedLanguageId}
          setValue={setSelectedLanguageId}
        >
          {possibleOptions.map((lang) => (
            <LudoSelectItem
              key={lang.languageId}
              value={lang.languageId.toString()}
              dataTestId={`select-item-${lang.slug}`}
            >
              <span className="flex items-center gap-3">
                <CustomIcon className="h-5 w-5" color="white" iconName={stringToCustomIcon(lang.iconName)}/>
                <span>{lang.name}</span>
              </span>
            </LudoSelectItem>
          ))}
        </LudoSelect>

        <LudoButton
          data-testid="create-project-button"
          disabled={isSubmitLoading || !selectedLanguageId}
          variant="alt"
          onClick={() => submitProject()}
          className="w-full flex justify-center"
        >
          Create Project
          {isSubmitLoading && (
            <Spinner className="ml-2 text-ludo-accent-muted" />
          )}
        </LudoButton>
      </div>
    </LudoDialog>
  );
}
