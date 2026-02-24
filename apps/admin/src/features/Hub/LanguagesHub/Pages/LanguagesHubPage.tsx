import { Hero } from "@ludocode/design-system/zones/hero.tsx";
import { languagesHeroContent } from "../content.ts";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { LanguageCard } from "../Components/Card/LanguageCard.tsx";
import { router } from "@/main.tsx";
import { adminNavigation } from "@/constants/adminNavigation.tsx";

type LanguagesHubPageProps = {};

export function LanguagesHubPage({}: LanguagesHubPageProps) {
  const languages = useSuspenseQuery(qo.languages()).data;
  return (
    <>
      <div className="layout-grid col-span-full scrollable py-6 px-8 lg:px-0">
        <div className="col-span-1 lg:bg-ludo-background lg:col-span-2"></div>
        <div className="col-span-10 relative lg:col-span-8 flex flex-col gap-8 items-stretch justify-start min-w-0">
          <Hero {...languagesHeroContent}>
            <div className="flex w-full justify-end items-end gap-4">
              <LudoButton className="w-1/3 px-2" variant="alt">
                Instructions
              </LudoButton>
              <LudoButton
                onClick={() =>
                  router.navigate(adminNavigation.language.toCreateLanguage())
                }
                variant="alt"
                className="w-1/3 px-2"
              >
                Create Language
              </LudoButton>
            </div>
          </Hero>

          <div className="w-full grid grid-cols-3 gap-x-4">
            {languages.map((language) => (
              <LanguageCard language={language} />
            ))}
          </div>
        </div>
        <div className="col-span-1 lg:bg-ludo-background lg:col-span-2"></div>
      </div>
    </>
  );
}
