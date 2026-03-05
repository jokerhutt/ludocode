import { adminNavigation } from "@/constants/adminNavigation.tsx";
import { router } from "@/main.tsx";
import {
  CustomIcon,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import type { LanguageMetadata } from "@ludocode/types";

type LanguageCardProps = { language: LanguageMetadata };

export function LanguageCard({ language }: LanguageCardProps) {
  return (
    <LudoButton
      onClick={() =>
        router.navigate(
          adminNavigation.language.toLanguage(language.languageId),
        )
      }
      className="w-full relative h-auto"
    >
      <CustomIcon
        className="absolute top-5 right-5 h-10 w-10"
        iconName={language.iconName as IconName}
        color="white"
      />
      <div className="w-full text-ludo-white p-4 text-start flex flex-col gap-2">
        <p>
          <span className="font-bold text-ludo-white-bright">NAME:</span>{" "}
          {language.name}
        </p>
        <p>
          <span className="font-bold text-ludo-white-bright">ID:</span>{" "}
          {language.languageId}
        </p>
        <p>
          <span className="font-bold text-ludo-white-bright">BASE:</span>{" "}
          {language.base}
        </p>
        <p>
          <span className="font-bold text-ludo-white-bright">EXTENSION:</span>{" "}
          {language.extension}
        </p>
        <p>
          <span className="font-bold text-ludo-white-bright">SLUG:</span>{" "}
          {language.slug}
        </p>
        <p>
          <span className="font-bold text-ludo-white-bright">ICON NAME:</span>{" "}
          {language.iconName}
        </p>
      </div>
    </LudoButton>
  );
}
