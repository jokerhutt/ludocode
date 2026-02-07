import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import {
  useLanguageDiffs,
  useLanguageForm,
} from "../hooks/useCreateLanguage.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { LudoInput } from "@ludocode/design-system/primitives/input.tsx";
import {
  LudoSelect,
  LudoSelectItem,
} from "@ludocode/design-system/primitives/select.tsx";
import {
  CustomIcon,
  Icons,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import { router } from "@/main.tsx";
import { adminNavigation } from "@/constants/adminNavigation.tsx";
import { DeleteDialog } from "@ludocode/design-system/templates/dialog/delete-dialog.tsx";
import type { DestructiveActionConfirmation } from "@ludocode/design-system/templates/dialog/WarningDialog.tsx";
import { useDeleteLanguage } from "../hooks/useDeleteLanguage.tsx";
import { useUpdateLanguage } from "../hooks/useUpdateLanguage.tsx";
import type { UpdateLanguageRequest } from "@ludocode/types";
import { LanguageDiffOverview } from "../Components/Diff/LanguageDiffOverview.tsx";
import { DeleteLanguageButton } from "../Components/Button/DeleteLanguageButton.tsx";
import { UpdateLanguageButton } from "../Components/Button/UpdateLanguageButton.tsx";
import { LanguageIconSelect } from "../Components/Select/LanguageIconSelect.tsx";
import { LanguageEditorIdSelect } from "../Components/Select/LanguageEditorIdSelect.tsx";
import { LanguageRuntimeSelect } from "../Components/Select/LanguageRuntimeSelect.tsx";

type LanguagePageProps = {};

export function LanguagePage({}: LanguagePageProps) {
  const routeApi = getRouteApi("/_app/language/$languageId");
  const { languageId } = routeApi.useParams();
  const id = Number(languageId);

  const runtimes = useSuspenseQuery(qo.runtimes()).data;
  const languages = useSuspenseQuery(qo.languages()).data;
  const language = languages.find((lang) => lang.languageId === id);

  const allCourses = useSuspenseQuery(qo.allCourses()).data;
  const attachedCourses = allCourses.filter(
    (course) => course.subject.codeLanguage == language?.name,
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
    editorId: formHook.editorId,
    pistonId: formHook.pistonId,
    base: formHook.base,
    iconName: formHook.iconName,
    initialScript: formHook.initialScript,
    extension: formHook.extension,
  });

  const hasAnyChange = languageDiffs.some((d) => d.hasChanged);

  return (
    <div className="layout-grid col-span-full scrollable py-6 px-8 lg:px-0">
      <div className="col-span-1 lg:bg-ludo-background lg:col-span-2"></div>
      <div className="col-span-10 relative lg:col-span-8 flex flex-col gap-8 items-stretch justify-start min-w-0">
        <div className="w-full text-ludoAltText">
          <h1 className="text-2xl font-bold">{formHook.languageName}</h1>
        </div>
        <div className=" grid gap-6 text-left text-sm grid-cols-4">
          <LudoInput
            containerClassName="col-span-2"
            error={formHook.errors.name}
            placeholder="E.g. Python"
            value={formHook.languageName}
            setValue={formHook.setLanguageName}
            title="Name"
          />

          <LudoInput
            containerClassName="col-span-2"
            error={formHook.errors.slug}
            placeholder="python"
            value={formHook.slug}
            setValue={formHook.setSlug}
            title="Slug"
          />

          <LanguageEditorIdSelect
            editorLanguages={formHook.editorLanguages}
            editorId={formHook.editorId}
            errors={formHook.errors.editorId}
            extension={formHook.extension}
            setEditorId={formHook.setEditorId}
          />

          <LanguageRuntimeSelect
            runtimeId={formHook.pistonId}
            setRuntimeId={formHook.setPistonId}
            availableRuntimes={formHook.availableRuntimes}
            errors={formHook.errors.pistonId}
          />

          <LudoInput
            containerClassName="col-span-2"
            error={formHook.errors.base}
            placeholder="main"
            value={formHook.base}
            setValue={formHook.setBase}
            title="Base"
          />

          <LanguageIconSelect
            currentValue={formHook.iconName}
            setValue={formHook.setIconName}
            errors={formHook.errors.iconName}
          />

          <LudoInput
            containerClassName="col-span-3"
            error={formHook.errors.initialScript}
            placeholder="print('Hello world')"
            value={formHook.initialScript}
            setValue={formHook.setInitialScript}
            title="Initial script"
          />
        </div>
        <hr className="border-ludo-accent" />

        <div className="grid grid-cols-4 gap-6">
          <div className="flex flex-col gap-4 text-ludoAltText col-span-1">
            <p>Attached Courses</p>
            {attachedCourses.map((course) => (
              <div className="flex flex-col text-sm">
                <p>•{course.title}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 text-ludoAltText col-span-3">
            <p>Changes</p>
            <div className="grid grid-cols-2">
              <LanguageDiffOverview languageDiffs={languageDiffs} />
            </div>
          </div>
        </div>

        <div className="grid gap-6 text-left h-full text-sm grid-cols-4">
          <div className="py-2 col-span-1 flex justify-center items-end">
            <DeleteLanguageButton
              langaugeName={language!!.name}
              languageId={id}
              attachedCourses={attachedCourses}
            />
          </div>

          <div className="py-2 col-span-1 flex justify-center items-end">
            <LudoButton
              onClick={() =>
                router.navigate(adminNavigation.hub.languages.toLanguagesHub())
              }
              variant={"white"}
              className="w-full"
            >
              Abort
            </LudoButton>
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
      <div className="col-span-1 lg:bg-ludo-background lg:col-span-2"></div>
    </div>
  );
}
