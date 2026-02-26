import { useMonacoTheme } from "@/features/Project/hooks/useMonacoTheme.tsx";
import type * as monacoTypes from "monaco-editor";
import Editor from "@monaco-editor/react";
import { useCodeRunnerContext } from "@/features/Project/context/CodeRunnerContext.tsx";
import { useProjectContext } from "@/features/Project/context/ProjectContext.tsx";
import { LudoSpinner } from "@ludocode/design-system/primitives/ludo-spinner.tsx";

type ProjectEditorProps = {
  isMarkedForDeletion?: boolean;
};

export function ProjectEditor({
  isMarkedForDeletion = false,
}: ProjectEditorProps) {
  const { active, updateContent } = useProjectContext();
  const { content, language, path } = active;
  const { runCode } = useCodeRunnerContext();

  const { beforeMount, editorOptions } = useMonacoTheme();

  function handleMount(
    editor: monacoTypes.editor.IStandaloneCodeEditor,
    monaco: typeof monacoTypes,
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
      key={path}
      path={path}
      height="100%"
      theme="custom-theme"
      defaultValue={content}
      onChange={(v) => updateContent(v ?? "")}
      beforeMount={beforeMount}
      loading={
        <LudoSpinner
          className="text-ludo-accent-muted"
          spinnerClassName="h-10 w-10"
          wide
        />
      }
      onMount={handleMount}
      language={language.editorId}
      options={{
        ...editorOptions,
        readOnly: isMarkedForDeletion,
      }}
    />
  );
}
