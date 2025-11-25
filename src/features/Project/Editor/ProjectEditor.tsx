import { useMonacoTheme } from "@/Hooks/UI/useMonacoTheme";
import type * as monacoTypes from "monaco-editor";
import Editor from "@monaco-editor/react";
type ProjectEditorProps = {
  path: string;
  language: string;
  value: string;
  onChange: (v: string) => void;
  runCode: () => void;
};

export function ProjectEditor({
  path,
  language,
  value,
  onChange,
  runCode,
}: ProjectEditorProps) {
  const { beforeMount, editorOptions } = useMonacoTheme();

  function handleMount(
    editor: monacoTypes.editor.IStandaloneCodeEditor,
    monaco: typeof monacoTypes
  ) {
    editor.onKeyDown((e) => {
      const isCmdEnter = e.metaKey && e.keyCode === monaco.KeyCode.Enter;

      if (isCmdEnter) {
        e.preventDefault();
        e.stopPropagation();
        runCode();
      }
    });
  }

  return (
    <Editor
      path={path}
      height="100%"
      theme="custom-theme"
      value={value}
      onChange={(v) => onChange(v ?? "")}
      beforeMount={beforeMount}
      onMount={handleMount}
      language={language}
      options={editorOptions}
    />
  );
}
