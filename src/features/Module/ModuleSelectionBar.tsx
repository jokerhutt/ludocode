import { HollowSlotButton } from "@/components/Atoms/Button/HollowSlotButton";
import { cn } from "@/lib/utils";

type ModuleSelectionBarProps = { className?: string };

export function ModuleSelectionBar({ className }: ModuleSelectionBarProps) {
  return (
    <div
      className={cn(
        "h-10 flex justify-center text-white w-full bg-ludoGrayLight",
        className
      )}
    >
      <HollowSlotButton className="h-7">
        <p>Module 1</p>
      </HollowSlotButton>
    </div>
  );
}
