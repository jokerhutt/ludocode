import { Button } from "@/components/external/ui/button.tsx";
import { useState } from "react";
import { LeaveUnsavedDialog } from "@/components/design-system/composites/dialog/leave-unsaved-dialog.tsx";
import { ExitButton } from "@/components/design-system/atoms/button/exit-button.tsx";
import { router } from "@/routes/router.tsx";
import { ludoNavigation } from "@/routes/navigator/ludoNavigation.tsx";

type BuilderHeaderProps = { handleFormSubmission: () => Promise<void> };

export function BuilderHeader({ handleFormSubmission }: BuilderHeaderProps) {
  const [actionsEnabled, setActionsEnabled] = useState<boolean>(true);
  const text = actionsEnabled ? "Lock" : "Unlock";
  const variant = actionsEnabled ? "default" : ("disabled" as const);

  return (
    <div className="grid grid-cols-12 items-center bg-ludoGrayLight text-white h-14 px-18">
      <div className="flex col-start-9 justify-end items-center col-end-12 gap-4">
        <LeaveUnsavedDialog
          title="Are you sure you want to exit the builder?"
          subtitle="All unsaved progress will be lost"
          onClick={() =>
            router.navigate(ludoNavigation.hub.builder.toBuilderHub())
          }
        >
          <ExitButton />
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
