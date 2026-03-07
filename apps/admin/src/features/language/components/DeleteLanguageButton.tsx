import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { DeleteDialog } from "@ludocode/design-system/templates/dialog/delete-dialog.tsx";
import { useDeleteLanguage } from "../hooks/useDeleteLanguage.tsx";
import type { DestructiveActionConfirmation } from "@ludocode/design-system/templates/dialog/WarningDialog.tsx";
import type { LudoCourse } from "@ludocode/types";

type DeleteLanguageButtonProps = {
  languageId: number;
  langaugeName: string;
  attachedCourses: LudoCourse[];
};

export function DeleteLanguageButton({
  languageId,
  langaugeName,
  attachedCourses,
}: DeleteLanguageButtonProps) {
  const deleteLanguageMutation = useDeleteLanguage({
    languageId,
  });

  const handleDeleteLanguage = () => {
    if (deleteLanguageMutation.isPending) return;
    deleteLanguageMutation.mutate();
  };

  const confirmation: DestructiveActionConfirmation = {
    confirmationValue: langaugeName,
    confirmationText: `type ${langaugeName} to confirm`,
  };

  const description =
    attachedCourses.length > 0
      ? `The following courses attached to this language will be DELETED: ${attachedCourses.map((course) => course.title)}`
      : "";

  return (
    <DeleteDialog
      targetName="this language"
      description={description}
      destructiveConfirmation={confirmation}
      onClick={() => handleDeleteLanguage()}
    >
      <LudoButton
        isLoading={deleteLanguageMutation.isPending}
        variant={"danger"}
        className="w-full"
      >
        Delete
      </LudoButton>
    </DeleteDialog>
  );
}
