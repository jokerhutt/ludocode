import { CustomIcon } from "@ludocode/design-system/primitives/custom-icon";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import type { LanguageMetadata, LudoCourseSubject } from "@ludocode/types";
import { ArrowLeftRight } from "lucide-react";
import { ChangeSubjectDialog } from "../Dialog/ChangeSubjectDialog";
import { ChangeLanguageDialog } from "../Dialog/ChangeLanguageDialog";
import { useState } from "react";

type CurriculumHeroProps = {
  courseId: string;
  courseSubject?: LudoCourseSubject;
  courseLanguage?: LanguageMetadata;
};

export function CurriculumHero({
  courseId,
  courseSubject,
  courseLanguage,
}: CurriculumHeroProps) {
  const [openSubjectModal, setOpenSubjectModal] = useState(false);
  const [openLanguageModal, setOpenLanguageModal] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* META CARDS ROW */}
      <div className="grid grid-cols-2 gap-4">
        {/* SUBJECT CARD */}
        <div className="flex items-center justify-between bg-ludo-background border border-ludo-border rounded-lg px-4 py-3">
          <div className="flex flex-col">
            <span className="text-xs text-ludoAltText uppercase tracking-wide">
              Subject
            </span>
            <span className="text-white font-semibold">
              {courseSubject?.name ?? "No Subject"}
            </span>
            <span className="text-xs text-ludo-accent-muted">
              {courseSubject ? `/${courseSubject.slug}` : "-"}
            </span>
          </div>

          {courseSubject && (
            <ChangeSubjectDialog
              open={openSubjectModal}
              close={() => setOpenSubjectModal(false)}
              courseId={courseId}
              currentSubjectSlug={courseSubject.slug}
            >
              <LudoButton
                onClick={() => setOpenSubjectModal(true)}
                variant="alt"
                shadow={false}
                className="px-3 py-2 w-10"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </LudoButton>
            </ChangeSubjectDialog>
          )}
        </div>

        {/* LANGUAGE CARD */}
        <div className="flex items-center justify-between bg-ludo-background border border-ludo-border rounded-lg px-4 py-3">
          <div className="flex flex-col">
            <span className="text-xs text-ludoAltText uppercase tracking-wide">
              Language
            </span>
            <span className="text-white font-semibold">
              {courseLanguage?.name ?? "No Language"}
            </span>
            <span className="text-xs text-ludo-accent-muted">
              {courseLanguage?.slug ? `/${courseLanguage.slug}` : "-"}
            </span>
          </div>

          {courseLanguage && (
            <ChangeLanguageDialog
              open={openLanguageModal}
              close={() => setOpenLanguageModal(false)}
              courseId={courseId}
              currentLanguageId={courseLanguage.languageId}
            >
              <LudoButton
                onClick={() => setOpenLanguageModal(true)}
                variant="alt"
                shadow={false}
                className="px-3 py-2 w-10"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </LudoButton>
            </ChangeLanguageDialog>
          )}
        </div>
      </div>
    </div>
  );
}
