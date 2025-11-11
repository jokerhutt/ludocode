import { useEffect } from "react";
import Editor, { type BeforeMount, type OnMount } from "@monaco-editor/react";

type ProjectPageProps = {};

export function ProjectPage({}: ProjectPageProps) {
  const beforeMount: BeforeMount = (monaco) => {
    monaco.editor.defineTheme("custom-theme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#303966",
        "editorGutter.background": "#303966",
      },
    });
  };

  const onMount: OnMount = (editor, monaco) => {
    monaco.editor.setTheme("custom-theme"); // ensure applied
  };

  return (
    <div className="grid col-span-full h-full grid-cols-12">
      <div className="col-span-1 bg-ludoGrayDark lg:col-span-2" />

      <div className="col-span-10 lg:col-span-8 flex flex-col gap-8 items-stretch justify-start min-w-0">
        <Editor
          height="100%"
          theme="custom-theme"
          beforeMount={beforeMount}
          onMount={onMount}
          language="python"
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false, // stops full-screen blank space
            cursorSurroundingLines: 8, // keeps 3 lines visible above/below cursor
            cursorSurroundingLinesStyle: "all",

            renderLineHighlight: "none",
            renderLineHighlightOnlyWhenFocus: false,
          }}
        />
      </div>

      <div className="col-span-1 bg-ludoGrayDark lg:col-span-2" />
    </div>
  );
}
