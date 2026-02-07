import type { LudoCourse } from "@ludocode/types";
import { LanguageAttachedCoursesSection } from "../../Sections/LanguageAttachedCoursesSection";
import { LanguageDiffSection } from "../../Sections/LanguageDiffSection";
import type { LanguageFieldDiff } from "../../hooks/useLanguageDiffs";

type LanguageOverviewGroupProps = {
  attachedCourses: LudoCourse[];
  languageDiffs: LanguageFieldDiff[];
};

export function LanguageOverviewGroup({
  attachedCourses,
  languageDiffs,
}: LanguageOverviewGroupProps) {
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="flex flex-col gap-4 text-ludoAltText col-span-1">
        <p>Attached Courses</p>
        <LanguageAttachedCoursesSection attachedCourses={attachedCourses} />
      </div>
      <div className="flex flex-col gap-4 text-ludoAltText col-span-3">
        <p>Changes</p>
        <div className="grid grid-cols-2">
          <LanguageDiffSection languageDiffs={languageDiffs} />
        </div>
      </div>
    </div>
  );
}
