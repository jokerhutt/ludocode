import { type ReactNode, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ludocode/external/ui/accordion";
import { useHotkeys } from "@ludocode/hooks";

type ChatBotAccordionProps = { children: ReactNode };

export function ChatBotAccordion({ children }: ChatBotAccordionProps) {
  const [open, setOpen] = useState<string | undefined>(undefined);

  const toggleAccordion = () => {
    setOpen((prev) => (prev === "item-1" ? undefined : "item-1"));
  };

  useHotkeys({
    TOGGLE_WINDOW: toggleAccordion,
  });
  return (
    <Accordion
      orientation="vertical"
      className=""
      value={open}
      onValueChange={setOpen}
      type="single"
      collapsible
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-ludo-white-bright hover:cursor-pointer rounded-none py-3 px-6 bg-ludo-surface/70">
          Chat with Ludo AI
        </AccordionTrigger>
        <AccordionContent className="">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
