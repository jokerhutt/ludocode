import { useMonacoTheme } from "@/hooks/UI/useMonacoTheme";
import type * as monacoTypes from "monaco-editor";
import Editor from "@monaco-editor/react";
import { useCodeRunnerContext } from "@/features/Project/Context/CodeRunnerContext.tsx";
import { useProjectContext } from "@/features/Project/Context/ProjectContext.tsx";
import { LudoSpinner } from "@/components/design-system/blocks/progress/ludo-spinner.tsx";

export function ProjectEditor() {
  const { active, updateContent } = useProjectContext();
  const { content, language, path } = active;
  const { runCode } = useCodeRunnerContext();

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
      value={content}
      onChange={(v) => updateContent(v ?? "")}
      beforeMount={beforeMount}
      loading={
        <LudoSpinner
          className="text-ludoLightPurple"
          spinnerClassName="h-10 w-10"
          wide
        />
      }
      onMount={handleMount}
      language={language}
      options={editorOptions}
    />
  );
}
