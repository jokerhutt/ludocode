import { DialogTitle } from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { type DevInfoContent } from "@ludocode/types/Static/DevInfoContent";
import ReactMarkdown from "react-markdown";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog.tsx";

type DevInfoDialogProps = {
  content: DevInfoContent;
  children: ReactNode;
};

export function DevInfoDialog({ content, children }: DevInfoDialogProps) {
  return (
    <LudoDialog trigger={<>{children}</>}>
      <DialogTitle className="text-white">{content.title}</DialogTitle>
      <div className="prose prose-invert  whitespace-pre-wrap text-white">
        <ReactMarkdown>{content.body}</ReactMarkdown>
      </div>
    </LudoDialog>
  );
}
