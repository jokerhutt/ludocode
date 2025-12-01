import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import type { DevInfoContent } from "@/constants/static-data/infoContent";
import ReactMarkdown from "react-markdown";
import { DialogWrapper } from "../DialogWrapper";

type DevInfoDialogProps = {
  content: DevInfoContent;
  children: ReactNode;
};

export function DevInfoDialog({ content, children }: DevInfoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogWrapper className="text-start">
        <DialogTitle className="text-white">{content.title}</DialogTitle>
        <div className="prose prose-invert  whitespace-pre-wrap text-white">
          <ReactMarkdown>{content.body}</ReactMarkdown>
        </div>
      </DialogWrapper>
    </Dialog>
  );
}
