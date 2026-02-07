import { adminNavigation } from "@/constants/adminNavigation";
import { router } from "@/main";
import {
  CustomIcon,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
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
      <div className="w-full text-ludoAltText p-4 text-start flex flex-col gap-2">
        <p>
          <span className="font-bold text-white">NAME:</span> {language.name}
        </p>
        <p>
          <span className="font-bold text-white">ID:</span>{" "}
          {language.languageId}
        </p>
        <p>
          <span className="font-bold text-white">BASE:</span> {language.base}
        </p>
        <p>
          <span className="font-bold text-white">EXTENSION:</span>{" "}
          {language.extension}
        </p>
        <p>
          <span className="font-bold text-white">SLUG:</span> {language.slug}
        </p>
        <p>
          <span className="font-bold text-white">ICON NAME:</span>{" "}
          {language.iconName}
        </p>
      </div>
    </LudoButton>
  );
}
