import {
  LudoSelect,
  LudoSelectItem,
} from "@ludocode/design-system/primitives/select.tsx";
import type { MonacoLanguage } from "../hooks/useLanguageForm.tsx";

type LanguageEditorIdSelectProps = {
  editorId: string;
  setEditorId: (v: string) => void;
  editorLanguages: MonacoLanguage[];
  extension?: string;
  errors?: string;
};

export function LanguageEditorIdSelect({
  editorId,
  setEditorId,
  editorLanguages,
  extension,
  errors,
}: LanguageEditorIdSelectProps) {
  return (
    <LudoSelect
      value={editorId}
      setValue={setEditorId}
      title={extension ? `Editor ID (${extension})` : "Editor ID"}
      error={errors}
    >
      <LudoSelectItem value="Select editor language">
        Select editor language
      </LudoSelectItem>

      {editorLanguages.map((lang) => (
        <LudoSelectItem key={lang.id} value={lang.id}>
          {lang.id}
        </LudoSelectItem>
      ))}
    </LudoSelect>
  );
}
