import { useMonacoTheme } from "@/features/project/hooks/useMonacoTheme.tsx";
import type * as monacoTypes from "monaco-editor";
import Editor from "@monaco-editor/react";
import { useCodeRunnerContext } from "@/features/project/workbench/context/CodeRunnerContext.tsx";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext.tsx";
import { LudoSpinner } from "@ludocode/design-system/primitives/ludo-spinner.tsx";
import { useEffect, useRef } from "react";

type ProjectEditorProps = {
  readOnly?: boolean;
  onExecuteAction?: () => void;
};

export function ProjectEditor({
  readOnly = false,
  onExecuteAction,
}: ProjectEditorProps) {
  const { active, updateContent } = useProjectContext();
  const { content, language, path } = active;
  const { runCode } = useCodeRunnerContext();
  const editorRef = useRef<monacoTypes.editor.IStandaloneCodeEditor | null>(
    null,
  );
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
    editorRef.current = editor;

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Intentionally no-op: save is handled by autosave.
    });

    editor.onKeyDown((e) => {
      const isCmdEnter =
        (e.metaKey || e.ctrlKey) && e.keyCode === monaco.KeyCode.Enter;
      const isCmdSave =
        (e.metaKey || e.ctrlKey) && e.keyCode === monaco.KeyCode.KeyS;

      if (isCmdSave) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

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
      path={path}
      height="100%"
      theme="custom-theme"
      value={content}
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
      language={language}
      options={{
        ...editorOptions,
        readOnly: readOnly,
      }}
    />
  );
}
