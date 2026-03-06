import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import {
  CustomIcon,
  IconRegistry,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import type { LanguageMetadata } from "@ludocode/types";
import { ArrowLeftRight, ChevronDown } from "lucide-react";
import { ChangeLanguageDialog } from "./ChangeLanguageDialog.tsx";
import { useState, useRef, useEffect } from "react";
import { useChangeCourseIcon } from "@/features/curriculum/hooks/useChangeIcon.tsx";

type CurriculumHeroProps = {
  courseId: string;
  courseIcon?: string;
  courseLanguage?: LanguageMetadata;
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
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const iconPickerRef = useRef<HTMLDivElement>(null);
  const { mutate: changeCourseIcon, isPending: isChangingIcon } =
    useChangeCourseIcon({ courseId });

  const currentIcon = languageIcons.includes(courseIcon as IconName)
    ? (courseIcon as IconName)
    : undefined;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        iconPickerRef.current &&
        !iconPickerRef.current.contains(e.target as Node)
      ) {
        setIconPickerOpen(false);
      }
    }
    if (iconPickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [iconPickerOpen]);

  return (
    <div className="flex flex-col gap-6">
      {/* META CARDS ROW */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative flex items-center justify-between bg-ludo-background border border-ludo-border rounded-lg px-4 py-3">
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

          <LudoButton
            onClick={() => setIconPickerOpen((prev) => !prev)}
            variant="alt"
            shadow={false}
            disabled={isChangingIcon}
            className="px-3 py-2 w-auto"
          >
            <ChevronDown className="h-4 w-4" />
          </LudoButton>

          {iconPickerOpen && (
            <div
              ref={iconPickerRef}
              className="absolute top-full left-0 right-0 mt-1 z-50 max-h-64 overflow-y-auto rounded-lg border border-ludo-border bg-ludo-background shadow-xl"
            >
              {languageIcons.map((name) => (
                <button
                  key={name}
                  type="button"
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-ludo-surface ${
                    name === currentIcon
                      ? "bg-ludo-surface text-ludo-white-bright"
                      : "text-ludo-white"
                  }`}
                  onClick={() => {
                    changeCourseIcon({ iconName: name });
                    setIconPickerOpen(false);
                  }}
                >
                  <CustomIcon
                    iconName={name}
                    color="white"
                    className="h-5 w-5 shrink-0"
                  />
                  <span className="text-sm font-medium">{name}</span>
                  {name === currentIcon && (
                    <span className="ml-auto text-xs text-ludo-accent-muted">
                      current
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
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
