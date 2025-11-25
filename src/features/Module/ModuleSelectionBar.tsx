import { HollowSlotButton } from "@/components/Atoms/Button/HollowSlotButton";
import { PythonIcon } from "@/components/Atoms/Icons/CustomIcon";
import { cn } from "@/lib/utils";
import { ludoNavigation } from "@/routes/ludoNavigation";
import { router } from "@/routes/router";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";

type ModuleSelectionBarProps = { className?: string };

export function ModuleSelectionBar({ className }: ModuleSelectionBarProps) {
  return (
    <div
      className={cn(
        "h-12 flex items-center justify-center text-white w-full bg-ludoGrayLight",
        className
      )}
    >
      <HollowSlotButton
        className="w-3/4 h-8 gap-4"
        onClick={() => router.navigate(ludoNavigation.courseRoot())}
      >
        <PythonIcon className="h-6" />
        <p>Module 1</p>
        <ArrowsRightLeftIcon className="h-6 text-white" />
      </HollowSlotButton>
    </div>
  );
}
