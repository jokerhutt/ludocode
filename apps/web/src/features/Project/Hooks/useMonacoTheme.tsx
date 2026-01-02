import { useMemo } from "react";
import type { BeforeMount } from "@monaco-editor/react";
import type * as monacoTypes from "monaco-editor";

export function useMonacoTheme() {
 

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

  const editorOptions: monacoTypes.editor.IStandaloneEditorConstructionOptions =
    useMemo(
      () => ({
        minimap: { enabled: false },
        fontSize: 16,
        padding: { bottom: 16 },
        scrollBeyondLastLine: false,
        cursorSurroundingLines: 8,
        cursorSurroundingLinesStyle: "all",
        renderLineHighlight: "none",
        renderLineHighlightOnlyWhenFocus: false,
      }),
      []
    );

  return { beforeMount, editorOptions };
}
