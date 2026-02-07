import { LudoInput } from "@ludocode/design-system/primitives/input";
import type { UseLanguageFormResponse } from "../hooks/useLanguageForm";
import { LanguageEditorIdSelect } from "../Components/Select/LanguageEditorIdSelect";
import { LanguageRuntimeSelect } from "../Components/Select/LanguageRuntimeSelect";
import { LanguageIconSelect } from "../Components/Select/LanguageIconSelect";

type LanguageFormInputProps = {
  formHook: UseLanguageFormResponse;
};

export function LanguageFormInput({ formHook }: LanguageFormInputProps) {
  return (
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
  );
}
