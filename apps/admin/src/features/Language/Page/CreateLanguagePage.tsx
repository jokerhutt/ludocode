import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLanguageForm } from "../hooks/useLanguageForm.tsx";
import { LanguageFormInput } from "../Sections/LanguageFormSection.tsx";
import { AbortLanguageEditButton } from "../Components/Button/AbortLanguageEditButton.tsx";
import { CreateLanguageButton } from "../Components/Button/CreateLanguageButton.tsx";

type CreateLanguagePageProps = {};

export function CreateLanguagePage({}: CreateLanguagePageProps) {
  const runtimes = useSuspenseQuery(qo.runtimes()).data;
  const languages = useSuspenseQuery(qo.languages()).data;

  const formHook = useLanguageForm({
    existingUserLanguages: languages,
    runtimes: runtimes,
  });

  return (
    <div className="col-span-10 relative lg:col-span-8 flex flex-col gap-8 items-stretch justify-start min-w-0">
      <div className="w-full text-ludoAltText">
        <h1 className="text-2xl font-bold">Create Language</h1>
      </div>
      <LanguageFormInput formHook={formHook} />
      <hr className="border-ludo-accent" />
      <div className="grid gap-6 text-left h-full text-sm grid-cols-4">
        <div className="py-2 col-span-2 flex justify-center items-end">
          <AbortLanguageEditButton />
        </div>

        <div className="py-2 col-span-2 flex justify-center items-end">
          <CreateLanguageButton validate={formHook.validate} />
        </div>
      </div>
    </div>
  );
}
