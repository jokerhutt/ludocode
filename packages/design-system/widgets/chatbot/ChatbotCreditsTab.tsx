import { cn } from "@ludocode/design-system/cn-utils";
import { CustomIcon } from "@ludocode/design-system/primitives/custom-icon";

type ChatbotCreditsTabProps = { credits: number; className?: string };

export function ChatbotCreditsTab({
  credits,
  className,
}: ChatbotCreditsTabProps) {
  return (
    <div
      className={cn(
        "w-full py-1.5 px-3 bg-ludoGrayLight flex gap-2 items-center text-ludoLightPurple border-b-white border-b",
        className
      )}
    >
      <CustomIcon iconName="AICredit" />
      <p>{credits} credits remaining</p>
    </div>
  );
}
