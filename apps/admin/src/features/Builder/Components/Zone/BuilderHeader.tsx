import { Button } from "@ludocode/external/ui/button";
import { useState } from "react";
import { LeaveUnsavedDialog } from "@ludocode/design-system/templates/dialog/leave-unsaved-dialog";
import { useRouter } from "@tanstack/react-router";
import { IconButton } from "@ludocode/design-system/primitives/icon-button";
import { adminNavigation } from "@/constants/adminNavigation";

type BuilderHeaderProps = { handleFormSubmission: () => Promise<void> };

export function BuilderHeader({ handleFormSubmission }: BuilderHeaderProps) {
  const router = useRouter();
  const [actionsEnabled, setActionsEnabled] = useState<boolean>(true);
  const text = actionsEnabled ? "Lock" : "Unlock";
  const variant = actionsEnabled ? "default" : ("disabled" as const);

  return (
    <div className="grid grid-cols-12 items-center bg-ludo-surface text-white h-14 px-18">
      <div className="flex col-start-9 justify-end items-center col-end-12 gap-4">
        <LeaveUnsavedDialog
          title="Are you sure you want to exit the builder?"
          subtitle="All unsaved progress will be lost"
          onClick={() =>
            router.navigate(adminNavigation.builder.toBuilderHub())
          }
        >
          <IconButton variant="large" iconName="XMarkIcon" />
        </LeaveUnsavedDialog>
        <Button
          variant={variant}
          onClick={() => {
            if (!actionsEnabled) return;
            handleFormSubmission();
          }}
        >
          Submit Snapshot
        </Button>
        <Button
          onClick={() => setActionsEnabled((v) => !v)}
          className="bg-white"
        >
          {text}
        </Button>
      </div>
    </div>
  );
}
