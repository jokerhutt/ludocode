import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useHotkeys } from "@/Hooks/UI/useHotkeys";
import { useState, type ReactNode } from "react";

type ChatBotAccordionProps = { children: ReactNode };

export function ChatBotAccordion({ children }: ChatBotAccordionProps) {
  const [open, setOpen] = useState<string | undefined>(undefined);

  const toggleAccordion = () => {
    setOpen(prev => (prev === "item-1" ? undefined : "item-1"));
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
        <AccordionTrigger className="text-white hover:cursor-pointer rounded-none py-3 px-6 bg-ludoGrayLight/70">
          Chat with Ludo AI
        </AccordionTrigger>
        <AccordionContent className="">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
