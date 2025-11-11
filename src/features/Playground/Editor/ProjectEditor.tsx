import Editor, { type BeforeMount, type OnMount } from "@monaco-editor/react";
type ProjectEditorProps = {
  path: string;
  language: string;
  value: string;
  onChange: (v: string) => void;
};

export function ProjectEditor({
  path,
  language,
  value,
  onChange,
}: ProjectEditorProps) {
  const beforeMount: BeforeMount = (monaco) => {
    monaco.editor.defineTheme("custom-theme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#22273E",
        "editorGutter.background": "#22273E",
      },
    });
  };

  const onMount: OnMount = (editor, monaco) => {
    monaco.editor.setTheme("custom-theme"); // ensure applied
  };

  return (
    <Editor
      path={path}
      height="100%"
      theme="custom-theme"
      value={value}
      onChange={(v) => onChange(v ?? "")}
      beforeMount={beforeMount}
      onMount={onMount}
      language={language}
      options={{
        minimap: { enabled: false },
        fontSize: 16,
        padding: { bottom: 16 },
        scrollBeyondLastLine: false,
        cursorSurroundingLines: 8,
        cursorSurroundingLinesStyle: "all",
        renderLineHighlight: "none",
        renderLineHighlightOnlyWhenFocus: false,
      }}
    />
  );
}
