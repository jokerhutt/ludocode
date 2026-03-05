import { DialogTitle } from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { type DevInfoContent } from "@ludocode/types/Static/DevInfoContent";
import ReactMarkdown from "react-markdown";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog";

type DevInfoDialogProps = {
  content: DevInfoContent;
  children: ReactNode;
};

export function DevInfoDialog({ content, children }: DevInfoDialogProps) {
  return (
    <LudoDialog trigger={<>{children}</>}>
      <DialogTitle className="text-ludo-white-bright">
        {content.title}
      </DialogTitle>
      <div className="prose prose-invert  whitespace-pre-wrap text-ludo-white-bright">
        <ReactMarkdown>{content.body}</ReactMarkdown>
      </div>
    </LudoDialog>
  );
}
