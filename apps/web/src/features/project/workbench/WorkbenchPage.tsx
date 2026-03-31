import { ProjectEditor } from "@/features/project/workbench/zones/ProjectEditor.tsx";
import { RunCodeButton } from "@/features/project/workbench/components/RunCodeButton.tsx";
import { CodeRunnerProvider } from "@/features/project/workbench/context/CodeRunnerContext.tsx";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext.tsx";
import { useAutoSaveContext } from "@/features/project/workbench/context/AutoSaveContext.tsx";
import { Workbench } from "@ludocode/design-system/widgets/workbench.tsx";
import { WorkbenchOutputPane } from "./zones/WorkbenchOutputPane.tsx";
import { WorkbenchLivePreviewPane } from "./zones/WorkbenchLivePreviewPane.tsx";
import { LudoTab } from "@ludocode/design-system/primitives/tab.tsx";
import { stripFileName } from "@/features/project/util/filenameUtil.ts";
import { WorkbenchTreePane } from "./zones/WorkbenchTreePane.tsx";
import { useFeatureEnabledCheck } from "@/features/auth/hooks/useFeatureEnabledCheck.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { useIsMobile } from "@ludocode/hooks";
import {
  WorkbenchMobileTabs,
  type WorkbenchMobilePane,
} from "./components/WorkbenchMobileTabs.tsx";
import { useMobileTabs } from "@/components/MobileTabs";
import { FooterCTAGroup } from "@/features/auth/components/FooterCTAGroup";

type WorkbenchPageProps = {
  readOnly?: boolean;
  authenticated?: boolean;
};

export function WorkbenchPage({
  readOnly = true,
  authenticated = false,
}: WorkbenchPageProps) {
  const { project, files, current, entryFileId } = useProjectContext();
  const { saveSuccessCount } = useAutoSaveContext();
  const isWebProject = project.projectType === "WEB";
  const runnerFeature = useFeatureEnabledCheck({ feature: "isPistonEnabled" });
  const isMobile = useIsMobile({});
  const { activeTab: mobilePane, selectTab: setMobilePane } =
    useMobileTabs<WorkbenchMobilePane>("code");

  return (
    <div className="flex flex-col lg:flex-row min-h-0 h-full overflow-hidden">
      <WorkbenchTreePane
        showAi={!isMobile}
        readOnly={readOnly}
        className={cn(mobilePane === "files" ? "flex-1" : "hidden", "lg:grid")}
        onFileSelect={() => {
          if (!isMobile) return;
          setMobilePane("code");
        }}
      />
      <CodeRunnerProvider
        project={project}
        files={files}
        disabled={!runnerFeature.enabled}
        entryFileId={entryFileId}
      >
        <WorkbenchPageContent
          projectId={project.projectId}
          isWebProject={isWebProject}
          previewRefreshVersion={saveSuccessCount}
          readOnly={readOnly}
          authenticated={authenticated}
          files={files}
          current={current}
          mobilePane={mobilePane}
          setMobilePane={setMobilePane}
          runnerEnabled={runnerFeature.enabled === true}
        />
      </CodeRunnerProvider>
    </div>
  );
}

function WorkbenchPageContent({
  projectId,
  isWebProject,
  previewRefreshVersion,
  readOnly,
  authenticated,
  files,
  current,
  mobilePane,
  setMobilePane,
  runnerEnabled,
}: {
  projectId: string;
  isWebProject: boolean;
  previewRefreshVersion: number;
  readOnly: boolean;
  authenticated: boolean;
  files: { path: string }[];
  current: number | null;
  mobilePane: WorkbenchMobilePane;
  setMobilePane: (pane: WorkbenchMobilePane) => void;
  runnerEnabled: boolean;
}) {
  return (
    <>
      <Workbench.Pane
        className={cn(
          mobilePane === "code" ? "flex flex-2" : "hidden",
          "relative flex-col gap-4 items-stretch justify-start min-w-0 lg:flex lg:flex-2",
        )}
      >
        {!authenticated && (
          <div className="lg:hidden px-3 pt-3">
            <FooterCTAGroup source="project_hub_footer" />
          </div>
        )}
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
        {!isWebProject && (
          <RunCodeButton disabled={!runnerEnabled} className="hidden lg:flex" />
        )}
      </Workbench.Pane>

      {isWebProject ? (
        <WorkbenchLivePreviewPane
          projectId={projectId}
          refreshVersion={previewRefreshVersion}
          className={cn(
            mobilePane === "output" ? "flex-1" : "hidden",
            "lg:flex lg:flex-1",
          )}
        />
      ) : (
        <WorkbenchOutputPane
          className={cn(
            mobilePane === "output" ? "flex-1" : "hidden",
            "lg:flex lg:flex-1",
          )}
        />
      )}

      <WorkbenchMobileTabs
        mobilePane={mobilePane}
        setMobilePane={setMobilePane}
        runnerEnabled={runnerEnabled}
        outputLabel={isWebProject ? "Preview" : "Output"}
        showRunButton={!isWebProject}
      />
    </>
  );
}
