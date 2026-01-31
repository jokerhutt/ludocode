import { cn } from "@ludocode/design-system/cn-utils";
import { CustomIcon } from "@ludocode/design-system/primitives/custom-icon";

type ChatbotCreditsTabProps = { credits: number; className?: string };

export function ChatbotCreditsTab({
  className,
  credits
}: ChatbotCreditsTabProps) {


  return (
    <div
      className={cn(
        "w-full py-1.5 px-3 bg-ludo-surface flex gap-2 items-center text-ludo-accent-muted border-b-white border-b",
        className
      )}
    >
      <CustomIcon iconName="AICredit" />
      <p>{credits} credits remaining</p>
    </div>
  );
}
