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

  const isMobile = useMemo(() => window.innerWidth < 768, []);

  const editorOptions: monacoTypes.editor.IStandaloneEditorConstructionOptions =
    useMemo(
      () => ({
        minimap: { enabled: false },
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        fontSize: 16,
        padding: { bottom: 16, left: isMobile ? 8 : 0 },
        scrollBeyondLastLine: false,
        smoothScrolling: false,
        cursorSurroundingLines: 0,
        cursorSurroundingLinesStyle: "default",
        cursorSmoothCaretAnimation: "off",
        cursorBlinking: "solid",
        renderLineHighlight: "none",
        renderLineHighlightOnlyWhenFocus: false,
        lineNumbersMinChars: isMobile ? 3 : 4,
      }),
      [isMobile],
    );

  return { beforeMount, editorOptions };
}
