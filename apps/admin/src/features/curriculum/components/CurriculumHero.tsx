import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import {
  CustomIcon,
  IconRegistry,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import type { LanguageKey } from "@ludocode/types";
import { Languages } from "@ludocode/types/Project/ProjectFileSnapshot";
import { ArrowLeftRight } from "lucide-react";
import { ChangeLanguageDialog } from "./ChangeLanguageDialog.tsx";
import { ChangeIconDialog } from "./ChangeIconDialog.tsx";
import { useState } from "react";

type CurriculumHeroProps = {
  courseId: string;
  courseIcon?: string;
  courseLanguage?: LanguageKey;
};

const languageIcons = Object.entries(IconRegistry)
  .filter(([_, def]) => def.category === "language")
  .map(([name]) => name as IconName);

export function CurriculumHero({
  courseId,
  courseIcon,
  courseLanguage,
}: CurriculumHeroProps) {
  const [openLanguageModal, setOpenLanguageModal] = useState(false);
  const [openIconModal, setOpenIconModal] = useState(false);

  const currentIcon = languageIcons.includes(courseIcon as IconName)
    ? (courseIcon as IconName)
    : undefined;

  return (
    <div className="flex flex-col gap-6">
      {/* META CARDS ROW */}
      <div className="grid grid-cols-2 gap-4">
        {/* ICON CARD */}
        <div className="flex items-center justify-between bg-ludo-background border border-ludo-border rounded-lg px-4 py-3">
          <div className="flex items-center gap-3">
            {currentIcon ? (
              <CustomIcon
                iconName={currentIcon}
                color="white"
                className="h-6 w-6"
              />
            ) : (
              <div className="h-6 w-6 rounded bg-ludo-border" />
            )}
            <div className="flex flex-col">
              <span className="text-xs text-ludo-white uppercase tracking-wide">
                Icon
              </span>
              <span className="text-ludo-white-bright font-semibold">
                {currentIcon ?? "None"}
              </span>
            </div>
          </div>

          <ChangeIconDialog
            open={openIconModal}
            close={() => setOpenIconModal(false)}
            courseId={courseId}
            currentIcon={courseIcon}
          >
            <LudoButton
              onClick={() => setOpenIconModal(true)}
              variant="alt"
              shadow={false}
              className="px-3 py-2 w-10"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </LudoButton>
          </ChangeIconDialog>
        </div>

        {/* LANGUAGE CARD */}
        <div className="flex items-center justify-between bg-ludo-background border border-ludo-border rounded-lg px-4 py-3">
          <div className="flex flex-col">
            <span className="text-xs text-ludo-white uppercase tracking-wide">
              Language
            </span>
            <span className="text-ludo-white-bright font-semibold">
              {courseLanguage && Languages[courseLanguage]
                ? Languages[courseLanguage].name
                : "No language"}
            </span>
            <span className="text-xs text-ludo-accent-muted">
              {courseLanguage ? `/${courseLanguage}` : "-"}
            </span>
          </div>

          {courseLanguage && (
            <ChangeLanguageDialog
              open={openLanguageModal}
              close={() => setOpenLanguageModal(false)}
              courseId={courseId}
              currentLanguage={courseLanguage}
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
