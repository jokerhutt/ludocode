import { LockIcon } from "@/components/Atoms/Icons/CustomIcon";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { CompletionRibbon } from "./CompletionRibbon";
import type { LessonCompletion } from "./PathButton";

type PathButtonTriggerProps = { lessonType: LessonCompletion };

export function PathButtonTrigger({ lessonType }: PathButtonTriggerProps) {


    
  return (
    <PopoverTrigger asChild>
      <button
        className={`relative hover:cursor-pointer inline-flex items-center justify-center
                      w-16 h-16 rounded-3xl bg-ludoGrayLight overflow-hidden
                      shadow-[0_10px_0_#262E57]
                      active:translate-y-2 active:shadow-none

                      data-[state=open]:translate-y-2
                      data-[state=open]:shadow-none`}
      >
        {lessonType == "LOCKED" && (
          <LockIcon className="absolute text-ludoGrayDark h-10 w-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
        )}
        <CompletionRibbon lessonState={lessonType} />
      </button>
    </PopoverTrigger>
  );
}
