import type { MonacoLanguage } from "../Dialog/CreateLanguageDialog";

type EditorLanguageSelectProps = {
  editorId: string;
  setEditorId: (value: string) => void;
  editorLanguages: MonacoLanguage[];
};

export function EditorLanguageSelect({editorId, setEditorId, editorLanguages}: EditorLanguageSelectProps) {
  return (
    <select
      className="w-full bg-transparent border border-ludo-accent-muted rounded px-2 py-1 text-white"
      value={editorId}
      onChange={(e) => setEditorId(e.target.value)}
    >
      <option value="">Select editor language</option>

      {editorLanguages.map((lang) => (
        <option key={lang.id} value={lang.id}>
          {lang.id}
        </option>
      ))}
    </select>
  );
}
