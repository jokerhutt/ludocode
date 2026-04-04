import { DiffEditor } from "@monaco-editor/react";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog";
import { DialogTitle } from "@ludocode/external/ui/dialog";
import { useMonacoTheme } from "@/features/project/hooks/useMonacoTheme";
import { useIsMobile } from "@ludocode/hooks";
import { LightbulbIcon } from "lucide-react";
import { useState } from "react";

type SolutionHintDialogProps = {
  currentCode: string;
  solution: string;
  languageId: string;
  onApplySolution: () => void;
};

export function SolutionHintDialog({
  currentCode,
  solution,
  languageId,
  onApplySolution,
}: SolutionHintDialogProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile({});
  const { beforeMount } = useMonacoTheme();

  function handleApply() {
    onApplySolution();
    setOpen(false);
  }

  return (
    <LudoDialog
      open={open}
      onOpenChange={setOpen}
      className="sm:max-w-[90vw] w-full text-left"
      trigger={
        <button
          type="button"
          className="h-10 hover:cursor-pointer w-10 flex items-center justify-center rounded-md bg-ludo-surface hover:bg-ludo-surface-hover text-ludo-white-bright transition-colors"
          title="View reference solution"
        >
          <LightbulbIcon className="h-5 w-5" />
        </button>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <DialogTitle className="text-ludo-white font-semibold text-left">
            Solution Hint
          </DialogTitle>
        </div>

        <div className="flex flex-col rounded-lg overflow-hidden">
          <div className="hidden sm:flex">
            <div className="flex-1 px-4 py-2 bg-ludo-background border-b border-ludo-border">
              <p className="text-xs font-medium text-ludo-accent-muted">
                Your code
              </p>
            </div>
            <div className="flex-1 px-4 py-2 bg-ludo-background border-b border-l border-ludo-border">
              <p className="text-xs font-medium text-ludo-accent-muted">
                Our solution
              </p>
            </div>
          </div>
          <div className="sm:hidden px-4 py-2 bg-ludo-background border-b border-ludo-border">
            <p className="text-xs font-medium text-ludo-accent-muted">
              Diff view
            </p>
          </div>
          <DiffEditor
            height={isMobile ? "420px" : "500px"}
            theme="custom-theme"
            language={languageId}
            original={currentCode}
            modified={solution}
            beforeMount={beforeMount}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              renderSideBySide: !isMobile,
              renderOverviewRuler: false,
              wordWrap: "on",
              padding: { top: 12 },
            }}
          />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xs text-ludo-white/50">
            Applying the solution will replace your current code.
          </p>
          <LudoButton
            type="button"
            variant="alt"
            shadow={false}
            onClick={handleApply}
            className="h-9 px-4 text-sm min-w-26 w-auto"
          >
            Apply
          </LudoButton>
        </div>
      </div>
    </LudoDialog>
  );
}
