import { useMonacoTheme } from "@/features/project/hooks/useMonacoTheme.tsx";
import type * as monacoTypes from "monaco-editor";
import Editor from "@monaco-editor/react";
import { useCodeRunnerContext } from "@/features/project/workbench/context/CodeRunnerContext.tsx";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext.tsx";
import { LudoSpinner } from "@ludocode/design-system/primitives/ludo-spinner.tsx";
import { useEffect, useRef } from "react";

type ProjectEditorProps = {
  isMarkedForDeletion?: boolean;
  onExecuteAction?: () => void;
};

export function ProjectEditor({
  isMarkedForDeletion = false,
  onExecuteAction,
}: ProjectEditorProps) {
  const { active, updateContent, editorEpoch } = useProjectContext();
  const { content, language, path } = active;
  const { runCode } = useCodeRunnerContext();
  const executeActionRef = useRef(onExecuteAction);
  const runCodeRef = useRef(runCode);

  useEffect(() => {
    executeActionRef.current = onExecuteAction;
  }, [onExecuteAction]);

  useEffect(() => {
    runCodeRef.current = runCode;
  }, [runCode]);

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
        if (executeActionRef.current) {
          executeActionRef.current();
          return;
        }
        runCodeRef.current();
      }
    });
  }

  return (
    <Editor
      key={`${path}:${editorEpoch}`}
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
