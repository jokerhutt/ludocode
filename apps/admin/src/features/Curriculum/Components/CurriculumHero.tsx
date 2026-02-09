import { CustomIcon } from "@ludocode/design-system/primitives/custom-icon";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { ArrowLeftRight } from "lucide-react";

type CurriculumHeroProps = {};

export function CurriculumHero({}: CurriculumHeroProps) {
  return (
    <div className="flex gap-4 text-lg font-bold text-white items-center">
      <CustomIcon color="white" className="h-6 w-6" iconName="Python" />
      <p>Subject: Python</p>
      <LudoButton
        className="w-auto h-auto px-4 py-1 rounded-sm"
        shadow={false}
        variant="alt"
      >
        <ArrowLeftRight className="h-4 w-4" />{" "}
      </LudoButton>
    </div>
  );
}
