import { qo } from "@/queries/definitions/queries.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { DeleteLanguageButton } from "@/features/language/components/DeleteLanguageButton.tsx";
import { UpdateLanguageButton } from "@/features/language/components/UpdateLanguageButton.tsx";
import { useLanguageDiffs } from "./hooks/useLanguageDiffs.tsx";
import { useLanguageForm } from "./hooks/useLanguageForm.tsx";
import { LanguageFormInput } from "./components/LanguageFormSection.tsx";
import { LanguageOverviewGroup } from "@/features/language/components/LanguageOverviewGroup.tsx";
import { AbortLanguageEditButton } from "@/features/language/components/AbortLanguageEditButton.tsx";

type LanguagePageProps = {};

export function ModifyLanguagePage({}: LanguagePageProps) {
  const routeApi = getRouteApi("/_app/language/$languageId");
  const { languageId } = routeApi.useParams();
  const id = Number(languageId);

  const runtimes = useSuspenseQuery(qo.runtimes()).data;
  const languages = useSuspenseQuery(qo.languages()).data;
  const language = languages.find((lang) => lang.languageId === id);

  const allCourses = useSuspenseQuery(qo.allCourses()).data;
  const attachedCourses = allCourses.filter(
    (course) => course.language?.name == language?.name,
  );

  const formHook = useLanguageForm({
    currentLanguage: language,
    existingUserLanguages: languages,
    runtimes: runtimes,
  });

  const languageDiffs = useLanguageDiffs({
    currentLanguage: language,
    languageName: formHook.languageName,
    slug: formHook.slug,
    runtime: formHook.runtime,
    editorId: formHook.editorId,
    pistonId: formHook.pistonId,
    base: formHook.base,
    iconName: formHook.iconName,
    initialScript: formHook.initialScript,
    extension: formHook.extension,
  });

  const hasAnyChange = languageDiffs.some((d) => d.hasChanged);

  return (
    <div className="col-span-10 relative lg:col-span-8 flex flex-col gap-8 items-stretch justify-start min-w-0">
      <div className="w-full text-ludo-white">
        <h1 className="text-2xl font-bold">{formHook.languageName}</h1>
      </div>
      <LanguageFormInput formHook={formHook} />
      <hr className="border-ludo-accent" />

      <LanguageOverviewGroup
        attachedCourses={attachedCourses}
        languageDiffs={languageDiffs}
      />

      <div className="grid gap-6 text-left h-full text-sm grid-cols-4">
        <div className="py-2 col-span-1 flex justify-center items-end">
          <DeleteLanguageButton
            langaugeName={language!!.name}
            languageId={id}
            attachedCourses={attachedCourses}
          />
        </div>

        <div className="py-2 col-span-1 flex justify-center items-end">
          <AbortLanguageEditButton />
        </div>

        <div className="py-2 col-span-2 flex justify-center items-end">
          <UpdateLanguageButton
            validate={formHook.validate}
            languageId={id}
            hasChanged={hasAnyChange}
          />
        </div>
      </div>
    </div>
  );
}
