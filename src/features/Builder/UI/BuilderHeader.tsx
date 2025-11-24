import { Button } from "@/components/ui/button";
import { LeaveUnsavedButton } from "./Button/LeaveUnsavedButton";
import { act, useState } from "react";

type BuilderHeaderProps = { handleFormSubmission: () => Promise<void> };

export function BuilderHeader({ handleFormSubmission }: BuilderHeaderProps) {
  const [actionsEnabled, setActionsEnabled] = useState<boolean>(true);
  const text = actionsEnabled ? "Lock" : "Unlock";
  const variant = actionsEnabled ? "default" : ("disabled" as const);

  return (
    <div className="grid grid-cols-12 items-center bg-ludoGrayLight text-white h-14 px-18">
      <div className="flex col-start-9 justify-end items-center col-end-12 gap-4">
        <LeaveUnsavedButton enabled={actionsEnabled} variant={variant} />
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
