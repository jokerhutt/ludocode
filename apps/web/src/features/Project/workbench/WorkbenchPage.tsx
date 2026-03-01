import { ProjectEditor } from "@/features/Project/workbench/editor/ProjectEditor.tsx";
import { RunCodeButton } from "@/features/Project/workbench/editor/RunCodeButton.tsx";
import { CodeRunnerProvider } from "@/features/Project/context/CodeRunnerContext.tsx";
import { useProjectContext } from "@/features/Project/context/ProjectContext.tsx";
import { Workbench } from "@ludocode/design-system/widgets/Workbench.tsx";
import { WorkbenchOutputPane } from "./output/WorkbenchOutputPane.tsx";
import { LudoTab } from "@ludocode/design-system/primitives/tab.tsx";
import { stripFileName } from "@/features/Project/util/filenameUtil.ts";
import { WorkbenchTreePane } from "./file-tree/WorkbenchTreePane.tsx";
import { useFeatureEnabledCheck } from "@/hooks/Guard/useFeatureEnabledCheck.tsx";

export function WorkbenchPage() {
  const { project, files, current } = useProjectContext();
  const runnerFeature = useFeatureEnabledCheck({feature: "isPistonEnabled"})

  return (
    <div className="grid col-span-full min-h-0 grid-cols-12">
      <WorkbenchTreePane className="col-span-1 lg:col-span-3" />
      <CodeRunnerProvider project={project} files={files}>
        <>
          <Workbench.Pane className="col-span-10 relative flex flex-col lg:col-span-6 gap-4 items-stretch justify-start min-w-0">
            <Workbench.Pane.Winbar>
              <LudoTab.Group>
                {current !== null && current !== undefined && (
                  <LudoTab.Item isActive>
                    <p>{stripFileName(files[current].path)}</p>
                  </LudoTab.Item>
                )}
              </LudoTab.Group>
            </Workbench.Pane.Winbar>
            <ProjectEditor isMarkedForDeletion={!!project.deleteAt} />
            <RunCodeButton disabled={!runnerFeature.enabled} />
          </Workbench.Pane>

          <WorkbenchOutputPane />
        </>
      </CodeRunnerProvider>
    </div>
  );
}
