import { qo } from "@/hooks/Queries/Definitions/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import {
  useLanguageDiffs,
  useLanguageForm,
} from "../LanguagesHub/Hooks/useCreateLanguage";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LudoInput } from "@ludocode/design-system/primitives/input";
import {
  LudoSelect,
  LudoSelectItem,
} from "@ludocode/design-system/primitives/select";
import {
  CustomIcon,
  Icons,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon";
import { router } from "@/main";
import { adminNavigation } from "@/constants/adminNavigation";
import { DeleteDialog } from "@ludocode/design-system/templates/dialog/delete-dialog";
import type { DestructiveActionConfirmation } from "@ludocode/design-system/templates/dialog/WarningDialog";
import { useDeleteLanguage } from "../LanguagesHub/Hooks/useDeleteLanguage";
import { useUpdateLanguage } from "../LanguagesHub/Hooks/useUpdateLanguage";
import type { UpdateLanguageRequest } from "@ludocode/types";

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

  const confirmation: DestructiveActionConfirmation = {
    confirmationValue: language!!.name,
    confirmationText: `type ${language!!.name} to confirm`,
  };

  const deleteLanguageMutation = useDeleteLanguage({
    languageId: id,
  });

  const handleDeleteAccount = () => {
    if (deleteLanguageMutation.isPending) return;
    deleteLanguageMutation.mutate();
  };

  const updateLanguageMutation = useUpdateLanguage({
    languageId: id,
  });

  const hasAnyChange = languageDiffs.some((d) => d.hasChanged);

  const handleUpdateAccount = (payload: UpdateLanguageRequest) => {
    if (updateLanguageMutation.isPending) return;
    if (!hasAnyChange) {
      router.navigate(adminNavigation.hub.languages.toLanguagesHub());
    } else {
      updateLanguageMutation.mutate(payload);
    }
  };

  const description =
    attachedCourses.length > 0
      ? `The following courses attached to this language will be DELETED: ${attachedCourses.map((course) => course.title)}`
      : "";

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

          <LudoSelect
            value={formHook.editorId}
            setValue={formHook.setEditorId}
            title={
              formHook.extension
                ? `Editor ID (.${formHook.extension})`
                : "Editor ID"
            }
            error={formHook.errors.editorId}
          >
            <LudoSelectItem value="Select editor language">
              Select editor language
            </LudoSelectItem>

            {formHook.editorLanguages.map((lang) => (
              <LudoSelectItem key={lang.id} value={lang.id}>
                {lang.id}
              </LudoSelectItem>
            ))}
          </LudoSelect>

          <LudoSelect
            value={formHook.pistonId}
            setValue={formHook.setPistonId}
            title="Runtime"
            error={formHook.errors.pistonId}
          >
            {formHook.availableRuntimes.map((rt) => (
              <LudoSelectItem
                key={`${rt.language}-${rt.version}-${rt.runtime ?? "default"}`}
                value={rt.language}
              >
                <span className="flex items-center gap-2">
                  <span>{rt.language}</span>
                  <span className="text-xs text-ludoAltText">{rt.version}</span>
                </span>
              </LudoSelectItem>
            ))}
          </LudoSelect>

          <LudoInput
            containerClassName="col-span-2"
            error={formHook.errors.base}
            placeholder="main"
            value={formHook.base}
            setValue={formHook.setBase}
            title="Base"
          />

          <LudoSelect
            value={formHook.iconName}
            setValue={(v) => formHook.setIconName(v as IconName)}
            title="Icon"
            error={formHook.errors.iconName}
          >
            {(Object.keys(Icons) as IconName[]).map((name) => (
              <LudoSelectItem key={name} value={name}>
                <span className="flex items-center gap-2">
                  <CustomIcon
                    iconName={name}
                    className="h-4 w-4"
                    color="white"
                  />
                  <span>{name}</span>
                </span>
              </LudoSelectItem>
            ))}
          </LudoSelect>

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
              {languageDiffs
                .filter((d) => d.hasChanged)
                .map((d) => (
                  <div
                    key={d.field}
                    className={`flex items-center gap-4 text-sm ${d.field == "initialScript" ? "col-span-2" : "col-span-1"} text-ludoAltText`}
                  >
                    <span className="font-medium text-white">{d.field}</span>

                    <span className="text-ludoAltText">:</span>

                    <span className="line-through text-red-400">
                      {d.oldValue || "∅"}
                    </span>

                    <span className="text-ludoAltText">→</span>

                    <span className="text-green-400">{d.newValue || "∅"}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 text-left h-full text-sm grid-cols-4">
          <div className="py-2 col-span-1 flex justify-center items-end">
            <DeleteDialog
              targetName="this language"
              description={description}
              destructiveConfirmation={confirmation}
              onClick={() => handleDeleteAccount()}
            >
              <LudoButton
                isLoading={deleteLanguageMutation.isPending}
                variant={"danger"}
                className="w-full"
              >
                Delete
              </LudoButton>
            </DeleteDialog>
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
            <LudoButton
              onClick={() => {
                const payload = formHook.validate();
                if (!payload) return;
                handleUpdateAccount(payload);
              }}
              variant={"alt"}
              className="w-full"
            >
              Save & Exit
            </LudoButton>
          </div>
        </div>
      </div>
      <div className="col-span-1 lg:bg-ludo-background lg:col-span-2"></div>
    </div>
  );
}
