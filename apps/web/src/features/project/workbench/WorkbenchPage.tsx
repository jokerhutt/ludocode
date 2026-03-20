import { ProjectEditor } from "@/features/project/workbench/editor/ProjectEditor.tsx";
import { RunCodeButton } from "@/features/project/workbench/editor/RunCodeButton.tsx";
import { CodeRunnerProvider } from "@/features/project/workbench/context/CodeRunnerContext.tsx";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext.tsx";
import { Workbench } from "@ludocode/design-system/widgets/Workbench.tsx";
import { WorkbenchOutputPane } from "./output/WorkbenchOutputPane.tsx";
import { LudoTab } from "@ludocode/design-system/primitives/tab.tsx";
import { stripFileName } from "@/features/project/util/filenameUtil.ts";
import { WorkbenchTreePane } from "./file-tree/WorkbenchTreePane.tsx";
import { useFeatureEnabledCheck } from "@/features/auth/hooks/useFeatureEnabledCheck.tsx";

type WorkbenchPageProps = {
  readOnly?: boolean;
}

export function WorkbenchPage({readOnly = true}: WorkbenchPageProps) {
  const { project, files, current, entryFileId } = useProjectContext();
  const runnerFeature = useFeatureEnabledCheck({ feature: "isPistonEnabled" });

  return (
    <div className="flex min-h-0">
      <WorkbenchTreePane readOnly={readOnly}/>
      <CodeRunnerProvider
        project={project}
        files={files}
        disabled={!runnerFeature.enabled}
        entryFileId={entryFileId}
      >
        <>
          <Workbench.Pane className="flex-[2] relative flex flex-col  gap-4 items-stretch justify-start min-w-0">
            <Workbench.Pane.Winbar>
              <LudoTab.Group>
                {current !== null && current !== undefined && (
                  <LudoTab.Item isActive>
                    <p>{stripFileName(files[current].path)}</p>
                  </LudoTab.Item>
                )}
              </LudoTab.Group>
            </Workbench.Pane.Winbar>
            <ProjectEditor readOnly={readOnly} />
            <RunCodeButton disabled={!runnerFeature.enabled} />
          </Workbench.Pane>

          <WorkbenchOutputPane className="flex-1" />
        </>
      </CodeRunnerProvider>
    </div>
  );
}
