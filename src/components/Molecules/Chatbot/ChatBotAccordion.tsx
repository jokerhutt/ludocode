import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ReactNode } from "react";

type ChatBotAccordionProps = { children: ReactNode };

export function ChatBotAccordion({ children }: ChatBotAccordionProps) {
  return (
    <Accordion
      orientation="vertical"
      className=""
      type="single"
      collapsible
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-white hover:cursor-pointer rounded-none py-3 px-6 bg-ludoGrayLight/70">Chat with Ludo AI</AccordionTrigger>
        <AccordionContent className="">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
