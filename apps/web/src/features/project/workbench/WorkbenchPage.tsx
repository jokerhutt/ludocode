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
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { useIsMobile } from "@ludocode/hooks";
import {
  WorkbenchMobileTabs,
  type WorkbenchMobilePane,
} from "./components/WorkbenchMobileTabs.tsx";
import { useMobileTabs } from "@/components/MobileTabs";

type WorkbenchPageProps = {
  readOnly?: boolean;
  authenticated?: boolean;
};

export function WorkbenchPage({
  readOnly = true,
  authenticated = false,
}: WorkbenchPageProps) {
  const { project, files, current, entryFileId } = useProjectContext();
  const runnerFeature = useFeatureEnabledCheck({ feature: "isPistonEnabled" });
  const isMobile = useIsMobile({});
  const { activeTab: mobilePane, selectTab: setMobilePane } =
    useMobileTabs<WorkbenchMobilePane>("code");

  return (
    <div className="flex flex-col lg:flex-row min-h-0">
      <WorkbenchTreePane
        showAi={!isMobile}
        readOnly={readOnly}
        className={cn(mobilePane === "files" ? "flex-1" : "hidden", "lg:block")}
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
  readOnly,
  authenticated,
  files,
  current,
  mobilePane,
  setMobilePane,
  runnerEnabled,
}: {
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
        <RunCodeButton disabled={!runnerEnabled} />
      </Workbench.Pane>

      <WorkbenchOutputPane
        className={cn(
          mobilePane === "output" ? "flex-1" : "hidden",
          "lg:flex lg:flex-1",
        )}
      />

      <WorkbenchMobileTabs
        authenticated={authenticated}
        mobilePane={mobilePane}
        setMobilePane={setMobilePane}
      />
    </>
  );
}
