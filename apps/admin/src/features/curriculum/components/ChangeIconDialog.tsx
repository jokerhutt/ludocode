import { DialogTitle } from "@ludocode/external/ui/dialog.tsx";
import { type ReactNode, useEffect, useState } from "react";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { Spinner } from "@ludocode/external/ui/spinner.tsx";
import {
  LudoSelect,
  LudoSelectItem,
} from "@ludocode/design-system/primitives/select.tsx";
import {
  CustomIcon,
  IconRegistry,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import { useChangeCourseIcon } from "@/features/curriculum/hooks/useChangeIcon.tsx";

const languageIcons = Object.entries(IconRegistry)
  .filter(([_, def]) => def.category === "language")
  .map(([name]) => name as IconName);

type ChangeIconDialogProps = {
  open: boolean;
  close: () => void;
  children: ReactNode;
  courseId: string;
  currentIcon?: string;
};

export function ChangeIconDialog({
  open,
  close,
  children,
  courseId,
  currentIcon,
}: ChangeIconDialogProps) {
  const changeMutation = useChangeCourseIcon({ courseId });

  const [selectedIcon, setSelectedIcon] = useState<string>("");

  const hasChanged = currentIcon !== selectedIcon;

  useEffect(() => {
    if (open) {
      setSelectedIcon(currentIcon ?? "");
    }
  }, [open, currentIcon]);

  const isLoading = changeMutation.isPending;

  const handleSubmit = () => {
    if (!hasChanged) {
      close();
      return;
    }

    changeMutation.mutate(
      { iconName: selectedIcon as IconName },
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
        Change Icon
      </DialogTitle>

      <div className="flex flex-col gap-6 mt-4">
        <LudoSelect
          variant="dark"
          title="Icon"
          value={selectedIcon}
          setValue={setSelectedIcon}
        >
          {languageIcons.map((name) => (
            <LudoSelectItem key={name} value={name}>
              <span className="flex items-center gap-2">
                <CustomIcon iconName={name} color="white" className="h-4 w-4" />
                <span>{name}</span>
              </span>
            </LudoSelectItem>
          ))}
        </LudoSelect>

        <LudoButton
          disabled={isLoading || !selectedIcon}
          variant="alt"
          onClick={handleSubmit}
          className="w-full flex justify-center"
        >
          {hasChanged ? "Change Icon" : "Exit"}
          {isLoading && <Spinner className="ml-2 text-ludo-accent-muted" />}
        </LudoButton>
      </div>
    </LudoDialog>
  );
}
