import { adminNavigation } from "@/constants/adminNavigation.tsx";
import { router } from "@/main.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import {
  CustomIcon,
  stringToCustomIcon,
} from "@ludocode/design-system/primitives/custom-icon";
import { ShadowLessButton } from "@ludocode/design-system/primitives/shadowless-button";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog";
import { Input } from "@ludocode/external/ui/input";
import { DialogTitle } from "@ludocode/external/ui/dialog";
import { useState, type MouseEvent } from "react";
import { useToggleLanguageVisibility } from "@/features/language/hooks/useToggleLanguageVisibility.tsx";
import { useChangeLanguageDisabledReason } from "@/features/language/hooks/useChangeLanguageDisabledReason.tsx";
import type { LanguageMetadata } from "@ludocode/types";

type LanguagesPaneProps = {
  className?: string;
  languages: LanguageMetadata[];
};

type LanguageCardProps = {
  language: LanguageMetadata;
};

function LanguageCard({ language }: LanguageCardProps) {
  const toggleVisibility = useToggleLanguageVisibility({
    languageId: language.languageId,
  });
  const changeReason = useChangeLanguageDisabledReason({
    languageId: language.languageId,
  });

  const [reasonDialogOpen, setReasonDialogOpen] = useState(false);
  const [reasonDraft, setReasonDraft] = useState(language.disabledReason ?? "");

  const isDisabled = language.enabled === false;
  const disabledReason =
    language.disabledReason?.trim() || "No disabled reason set.";

  const stopCardNavigation = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const handleToggleVisibility = (e: MouseEvent<HTMLButtonElement>) => {
    stopCardNavigation(e);

    const nextEnabled = !language.enabled;
    toggleVisibility.mutate({
      enabled: nextEnabled,
      message: nextEnabled
        ? undefined
        : language.disabledReason?.trim() ||
          "This language has been temporarily disabled.",
    });
  };

  const handleSaveReason = () => {
    changeReason.mutate(
      { message: reasonDraft.trim() },
      {
        onSuccess: () => {
          setReasonDialogOpen(false);
        },
      },
    );
  };

  return (
    <div
      key={language.languageId}
      onClick={() =>
        router.navigate(
          adminNavigation.language.toLanguage(language.languageId),
        )
      }
      className="
        bg-ludo-surface
        hover:bg-ludo-surface/70
        transition
        border border-ludo-accent-muted/20
        rounded-lg
        p-4
        cursor-pointer
        flex
        flex-col
        gap-3
      "
    >
      <div className="flex justify-between items-start">
        <span className="text-base flex items-center gap-2 font-bold text-ludo-white-bright">
          {language.name}
          <CustomIcon
            color="white"
            className="h-4 w-4"
            iconName={stringToCustomIcon(language.iconName)}
          />
        </span>
        <span className="text-xs text-ludo-white opacity-70">
          /{language.slug}
        </span>
      </div>

      <div className="flex gap-4 text-xs text-ludo-white">
        <span className="opacity-60">ext: {language.extension}</span>
        <span className="opacity-60">base: {language.base}</span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "text-xs font-semibold px-2 py-1 rounded border",
            isDisabled
              ? "text-red-300 border-red-500/40 bg-red-500/10"
              : "text-emerald-300 border-emerald-500/40 bg-emerald-500/10",
          )}
        >
          {isDisabled ? "Disabled" : "Enabled"}
        </span>

        <div
          className="flex items-center gap-2"
          onClick={stopCardNavigation}
          onMouseDown={stopCardNavigation}
          onPointerDown={stopCardNavigation}
        >
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-ludo-accent-muted/40 bg-transparent px-3 py-1.5 text-xs font-medium text-ludo-white transition hover:bg-ludo-surface disabled:opacity-50"
            disabled={toggleVisibility.isPending}
            onClick={handleToggleVisibility}
          >
            {isDisabled ? "Enable" : "Disable"}
          </button>

          {isDisabled && (
            <LudoDialog
              open={reasonDialogOpen}
              onOpenChange={(open) => {
                setReasonDialogOpen(open);
                if (open) {
                  setReasonDraft(language.disabledReason ?? "");
                }
              }}
              trigger={
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-md border border-ludo-accent-muted/40 bg-transparent px-3 py-1.5 text-xs font-medium text-ludo-white transition hover:bg-ludo-surface disabled:opacity-50"
                  disabled={changeReason.isPending}
                  onClick={stopCardNavigation}
                >
                  Edit reason
                </button>
              }
            >
              <DialogTitle className="text-ludo-white-bright">
                Update disabled reason
              </DialogTitle>
              <Input
                className="text-ludo-white"
                value={reasonDraft}
                onChange={(e) => setReasonDraft(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder="Enter a reason users should see"
              />
              <button
                type="button"
                className="w-full rounded-md border border-ludo-accent-muted/40 bg-transparent px-4 py-2 text-sm font-medium text-ludo-white transition hover:bg-ludo-surface disabled:opacity-50"
                disabled={
                  changeReason.isPending || reasonDraft.trim().length === 0
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveReason();
                }}
              >
                Save reason
              </button>
            </LudoDialog>
          )}
        </div>
      </div>

      {isDisabled && (
        <p className="text-xs text-ludo-white/80 border border-ludo-accent-muted/25 rounded-md px-2 py-1">
          Reason: {disabledReason}
        </p>
      )}
    </div>
  );
}

export function LanguagesPane({ className, languages }: LanguagesPaneProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-lg text-ludo-white font-semibold tracking-wide">
          Languages
        </h2>

        <ShadowLessButton
          variant="alt"
          className="px-4 h-8 w-auto py-1 text-sm"
          onClick={() =>
            router.navigate(adminNavigation.language.toCreateLanguage())
          }
        >
          Create
        </ShadowLessButton>
      </div>

      {languages.length === 0 ? (
        <div className="text-sm text-ludo-white opacity-60">
          No languages available.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {languages.map((language) => (
            <LanguageCard key={language.languageId} language={language} />
          ))}
        </div>
      )}
    </div>
  );
}
