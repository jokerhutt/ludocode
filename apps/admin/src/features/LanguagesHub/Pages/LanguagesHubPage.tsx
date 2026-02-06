import { Hero } from "@ludocode/design-system/zones/hero";
import { languagesHeroContent } from "../content";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";
import {
  CustomIcon,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon";
import { CreateLanguageDialog } from "../Components/Dialog/CreateLanguageDialog";
import { useModal } from "@ludocode/hooks/ui/useModal";
import { uuid } from "@tanstack/react-form";

type LanguagesHubPageProps = {};

export function LanguagesHubPage({}: LanguagesHubPageProps) {
  const languages = useSuspenseQuery(qo.languages()).data;
  const {
    modalOpen: createLanguageOpen,
    openModal: openCreateLanguage,
    closeModal: closeCreateLanguage,
  } = useModal();
  return (
    <>
      <div className="layout-grid col-span-full scrollable py-6 px-8 lg:px-0">
        <div className="col-span-1 lg:bg-ludo-background lg:col-span-2"></div>
        <div className="col-span-10 relative lg:col-span-8 flex flex-col gap-8 items-stretch justify-start min-w-0">
          <Hero {...languagesHeroContent}>
            <LudoButton
              className="w-full lg:w-1/3 lg:h-10 h-full px-4 "
              variant="alt"
            >
              Instructions
            </LudoButton>
          </Hero>
          <LudoButton onClick={() => openCreateLanguage()} variant="alt" className="w-1/3">
            Create Language
          </LudoButton>
          <div className="w-full grid grid-cols-3">
            {languages.map((language) => (
              <LudoButton className="w-full relative h-auto">
                <CustomIcon
                  className="absolute top-5 right-5 h-10 w-10"
                  iconName={language.iconName as IconName}
                  color="white"
                />
                <div className="w-full p-4 text-start flex flex-col gap-2">
                  <p>NAME: {language.name}</p>
                  <p>ID: {language.languageId}</p>
                  <p>BASE: {language.base}</p>
                  <p>EXTENSION: {language.extension}</p>
                  <p>SLUG: {language.slug}</p>
                  <p>ICON NAME: {language.iconName}</p>
                  <p>INITIAL SCRIPT: {language.initialScript}</p>
                </div>
              </LudoButton>
            ))}
          </div>
        </div>
        <div className="col-span-1 lg:bg-ludo-background lg:col-span-2"></div>
      </div>

      <CreateLanguageDialog
        open={createLanguageOpen}
        close={closeCreateLanguage}
        hash={uuid()}
      />
    </>
  );
}
