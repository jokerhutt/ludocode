import { DialogTitle } from "@ludocode/external/ui/dialog.tsx";
import { type ReactNode, useEffect, useState } from "react";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { Spinner } from "@ludocode/external/ui/spinner.tsx";
import {
  LudoSelect,
  LudoSelectItem,
} from "@ludocode/design-system/primitives/select.tsx";
import { useChangeLanguage } from "@/features/curriculum/hooks/useChangeLanguage.tsx";
import type { LanguageKey } from "@ludocode/types";
import { Languages } from "@ludocode/types/Project/ProjectFileSnapshot";

type ChangeLanguageDialogProps = {
  open: boolean;
  close: () => void;
  children: ReactNode;
  courseId: string;
  currentLanguage?: LanguageKey;
};

export function ChangeLanguageDialog({
  open,
  close,
  children,
  courseId,
  currentLanguage,
}: ChangeLanguageDialogProps) {
  const changeMutation = useChangeLanguage({ courseId });

  const [selectedLanguage, setSelectedLanguage] = useState<
    LanguageKey | undefined
  >();

  const hasChanged = currentLanguage !== selectedLanguage;

  useEffect(() => {
    if (open) {
      setSelectedLanguage(currentLanguage);
    }
  }, [open, currentLanguage]);

  const isLoading = changeMutation.isPending;

  const handleSubmit = () => {
    if (!hasChanged || !selectedLanguage) {
      close();
      return;
    }

    changeMutation.mutate(
      { languageName: selectedLanguage },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  };

  return (
    <LudoDialog
      trigger={children}
      open={open}
      onOpenChange={(next) => {
        if (next) return;
        close();
      }}
    >
      <DialogTitle className="text-ludo-white-bright font-bold text-xl">
        Change Language
      </DialogTitle>

      <div className="flex flex-col gap-6 mt-4">
        <LudoSelect
          variant="dark"
          title="Language"
          value={selectedLanguage ?? ""}
          setValue={(v) => setSelectedLanguage(v as LanguageKey)}
        >
          {(Object.keys(Languages) as LanguageKey[]).map((key) => {
            const metadata = Languages[key];
            return (
              <LudoSelectItem key={key} value={key}>
                <span className="flex items-center gap-2">
                  <span>{metadata.name}</span>
                </span>
              </LudoSelectItem>
            );
          })}
        </LudoSelect>

        <LudoButton
          disabled={isLoading || !selectedLanguage}
          variant="alt"
          onClick={handleSubmit}
          className="w-full flex justify-center"
        >
          {hasChanged ? "Change language" : "Exit"}
          {isLoading && <Spinner className="ml-2 text-ludo-accent-muted" />}
        </LudoButton>
      </div>
    </LudoDialog>
  );
}
