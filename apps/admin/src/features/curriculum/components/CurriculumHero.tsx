import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import type { LanguageMetadata } from "@ludocode/types";
import { ArrowLeftRight, ImageIcon } from "lucide-react";
import { ChangeLanguageDialog } from "./ChangeLanguageDialog.tsx";
import { useState } from "react";

type CurriculumHeroProps = {
  courseId: string;
  courseLanguage?: LanguageMetadata;
};

export function CurriculumHero({
  courseId,
  courseLanguage,
}: CurriculumHeroProps) {
  const [openLanguageModal, setOpenLanguageModal] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* META CARDS ROW */}
      <div className="grid grid-cols-2 gap-4">
        {/* ICON CARD */}
        <div className="flex items-center justify-between bg-ludo-background border border-ludo-border rounded-lg px-4 py-3">
          <div className="flex flex-col">
            <span className="text-xs text-ludo-white uppercase tracking-wide">
              Icon
            </span>
            <span className="text-ludo-white-bright font-semibold">
              Default
            </span>
          </div>

          <LudoButton
            onClick={() => {
              /* TODO: open icon picker */
            }}
            variant="alt"
            shadow={false}
            className="px-3 py-2 w-10"
          >
            <ImageIcon className="h-4 w-4" />
          </LudoButton>
        </div>

        {/* LANGUAGE CARD */}
        <div className="flex items-center justify-between bg-ludo-background border border-ludo-border rounded-lg px-4 py-3">
          <div className="flex flex-col">
            <span className="text-xs text-ludo-white uppercase tracking-wide">
              Language
            </span>
            <span className="text-ludo-white-bright font-semibold">
              {courseLanguage?.name ?? "No language"}
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
