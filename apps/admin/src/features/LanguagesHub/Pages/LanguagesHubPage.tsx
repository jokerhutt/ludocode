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
import { LanguageCard } from "../Components/Card/LanguageCard";

type LanguagesHubPageProps = {};

export function LanguagesHubPage({}: LanguagesHubPageProps) {
  const languages = useSuspenseQuery(qo.languages()).data;
  const runtimes = useSuspenseQuery(qo.runtimes()).data;
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
            <div className="flex w-full justify-end items-end gap-4">
              <LudoButton className="w-1/3 px-2" variant="alt">
                Instructions
              </LudoButton>
              <LudoButton
                onClick={() => openCreateLanguage()}
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

      <CreateLanguageDialog
        existingUserLanguages={languages}
        runtimes={runtimes}
        open={createLanguageOpen}
        close={closeCreateLanguage}
        hash={uuid()}
      />
    </>
  );
}
