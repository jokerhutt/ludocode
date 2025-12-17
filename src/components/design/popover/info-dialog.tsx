import { DialogTitle } from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import type { DevInfoContent } from "@/constants/content/infoContent.ts";
import ReactMarkdown from "react-markdown";
import { LudoDialog } from "../primitives/LudoDialog";

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
