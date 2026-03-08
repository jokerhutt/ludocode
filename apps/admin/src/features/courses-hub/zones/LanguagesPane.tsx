import { adminNavigation } from "@/constants/adminNavigation.tsx";
import { router } from "@/main.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { CustomIcon, stringToCustomIcon } from "@ludocode/design-system/primitives/custom-icon";
import { ShadowLessButton } from "@ludocode/design-system/primitives/shadowless-button";
import type { LanguageMetadata } from "@ludocode/types";

type LanguagesPaneProps = {
  className?: string;
  languages: LanguageMetadata[];
};

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
                gap-1
              "
            >
              <div className="flex justify-between items-start">
                <span className="text-base flex items-center gap-2 font-bold text-ludo-white-bright">
                  {language.name}
                  <CustomIcon color="white" className="h-4 w-4" iconName={stringToCustomIcon(language.iconName)} />
                </span>
                <span className="text-xs text-ludo-white opacity-70">
                  /{language.slug}
                </span>
              </div>

              <div className="flex gap-4 text-xs text-ludo-white">
                <span className="opacity-60">ext: {language.extension}</span>
                <span className="opacity-60">base: {language.base}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
