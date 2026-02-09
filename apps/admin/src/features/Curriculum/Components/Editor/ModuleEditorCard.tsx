import { LudoInput } from "@ludocode/design-system/primitives/input";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { Grip } from "lucide-react";

type ModuleEditorCardProps = {};

export function ModuleEditorCard({}: ModuleEditorCardProps) {
  return (
    <div className="flex rounded-lg text-white border-3 p-4 border-dashed border-ludo-accent h-full flex-col w-full">
      <div className="w-full flex items-center gap-4">
        <Grip className="h-5 w-5" />
        <p>Intro to Python</p>
      </div>
      <div className="flex flex-col gap-4 w-full p-4 h-full">
        <div className="w-full flex items-center gap-2">
          <Grip className="h-5 w-5" />
          <LudoInput
            className="h-10"
            value={"Hello World"}
            setValue={() => () => null}
          />
        </div>
        <div className="w-full flex items-center gap-2">
          <Grip className="h-5 w-5" />
          <LudoInput
            className="h-10"
            value={"Hello World"}
            setValue={() => () => null}
          />
        </div>
        <div className="w-full flex items-center gap-2">
          <Grip className="h-5 w-5" />
          <LudoInput
            className="h-10"
            value={"Hello World"}
            setValue={() => () => null}
          />
        </div>
      </div>
      <div className="w-full flex justify-between pr-4 items-center gap-4">
        <LudoButton
          className="w-auto h-auto px-4 py-1 rounded-sm"
          shadow={false}
          variant="white"
        >
          Add Lesson
        </LudoButton>
        <div className="flex justify-end gap-4">
          <LudoButton
            className="w-auto h-auto px-4 py-1 rounded-sm"
            shadow={false}
            variant="alt"
          >
            Abort
          </LudoButton>
          <LudoButton
            className="w-auto h-auto px-4 py-1 rounded-sm"
            shadow={false}
            variant="alt"
          >
            Save
          </LudoButton>
        </div>
      </div>
    </div>
  );
}
