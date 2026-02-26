import { ProjectEditor } from "@/features/Project/Editor/ProjectEditor.tsx";
import { RunCodeButton } from "@/features/Project/Editor/RunCodeButton.tsx";
import { CodeRunnerProvider } from "@/features/Project/Context/CodeRunnerContext.tsx";
import { useProjectContext } from "@/features/Project/Context/ProjectContext.tsx";
import { Workbench } from "./components/Workbench";
import { WorkbenchOutputPane } from "./Runner/WorkbenchOutputPane";
import { LudoTab } from "@ludocode/design-system/primitives/tab";
import { stripFileName } from "./Util/filenameUtil";
import { WorkbenchTreePane } from "./Runner/WorkbenchTreePane";

export function ProjectPage() {
  const { project, files, current } = useProjectContext();

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
            <RunCodeButton />
          </Workbench.Pane>

          <WorkbenchOutputPane />
        </>
      </CodeRunnerProvider>
    </div>
  );
}
