import { DialogTitle } from "@ludocode/external/ui/dialog";
import { type ReactNode, useEffect, useState } from "react";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { Spinner } from "@ludocode/external/ui/spinner";
import {
  LudoSelect,
  LudoSelectItem,
} from "@ludocode/design-system/primitives/select";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { useChangeLanguage } from "../../Hooks/useChangeLanguage";

type ChangeLanguageDialogProps = {
  open: boolean;
  close: () => void;
  children: ReactNode;
  courseId: string;
  currentLanguageId?: number;
};

export function ChangeLanguageDialog({
  open,
  close,
  children,
  courseId,
  currentLanguageId,
}: ChangeLanguageDialogProps) {
  const { data: languages } = useSuspenseQuery(qo.languages());

  const changeMutation = useChangeLanguage({ courseId });

  const [selectedLanguageId, setSelectedLanguageId] = useState<number>(0);

  const hasChanged = currentLanguageId !== selectedLanguageId;

  useEffect(() => {
    if (open) {
      setSelectedLanguageId(currentLanguageId ?? 0);
    }
  }, [open, currentLanguageId]);

  const isLoading = changeMutation.isPending;

  const handleSubmit = () => {
    if (!hasChanged) {
      close();
      return;
    }

    changeMutation.mutate(
      { languageId: selectedLanguageId },
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
          value={selectedLanguageId.toString()}
          setValue={(v) => setSelectedLanguageId(Number(v))}
        >
          {languages.map((lang) => (
            <LudoSelectItem
              key={lang.languageId}
              value={lang.languageId.toString()}
            >
              <span className="flex items-center gap-2">
                <span>{lang.name}</span>
                {lang.slug && (
                  <span className="text-xs text-ludo-white">/{lang.slug}</span>
                )}
              </span>
            </LudoSelectItem>
          ))}
        </LudoSelect>

        <LudoButton
          disabled={isLoading || !selectedLanguageId}
          variant="alt"
          onClick={handleSubmit}
          className="w-full flex justify-center"
        >
          {hasChanged ? "Change Language" : "Exit"}
          {isLoading && <Spinner className="ml-2 text-ludo-accent-muted" />}
        </LudoButton>
      </div>
    </LudoDialog>
  );
}
