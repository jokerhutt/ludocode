import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { CurriculumModuleList } from "./CurriculumModuleList";
import {
  CurriculumListBody,
  CurriculumListFooter,
  CurriculumListHeader,
} from "./CurriculumList";

type LessonPreviewProps = {};

export function LessonPreview({}: LessonPreviewProps) {
  return (
    <div className="flex rounded-lg min-h-0 text-white border-3 border-ludo-border max-h-1/2 flex-col w-full">
      <CurriculumListHeader>
        <p className="text-white font-bold">Print Statements</p>
        <LudoButton
          className="w-auto h-auto px-4 py-1 rounded-sm"
          shadow={false}
          variant="alt"
        >
          <p className="text-sm">Edit Exercises</p>
        </LudoButton>
      </CurriculumListHeader>

      <CurriculumListBody>
        <CurriculumModuleList />
        <CurriculumModuleList />
        <CurriculumModuleList />
      </CurriculumListBody>

      <CurriculumListFooter>
        <p className="text-xs">Last Modified: 6th of January at 18:32</p>
        <LudoButton
          className="w-auto h-auto px-4 py-1 rounded-sm"
          shadow={false}
          variant="white"
        >
          <p className="text-sm">Cheatsheet</p>
        </LudoButton>
      </CurriculumListFooter>
    </div>
  );
}
