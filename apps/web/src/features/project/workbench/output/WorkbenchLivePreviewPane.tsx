import { WEB_CDN_BASE_URL } from "@/constants/environment/env.ts";
import { IconButton } from "@ludocode/design-system/primitives/icon-button.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { Workbench } from "@ludocode/design-system/widgets/Workbench.tsx";
import { useState } from "react";

type WorkbenchLivePreviewPaneProps = {
  projectId: string;
  className?: string;
  refreshVersion?: number;
  hideWinbarOnMobile?: boolean;
};

function buildPreviewUrl(projectId: string): string {
  const base = (WEB_CDN_BASE_URL ?? "").trim().replace(/\/+$/, "");
  if (!base || !projectId) return "";
  return `${base}/${projectId}/index.html`;
}

export function WorkbenchLivePreviewPane({
  projectId,
  refreshVersion = 0,
  className,
  hideWinbarOnMobile = false,
}: WorkbenchLivePreviewPaneProps) {
  const [manualRefreshVersion, setManualRefreshVersion] = useState(0);
  const previewUrl = buildPreviewUrl(projectId);
  const iframeSrc =
    previewUrl.length > 0
      ? `${previewUrl}${previewUrl.includes("?") ? "&" : "?"}autosave=${refreshVersion}&refresh=${manualRefreshVersion}`
      : "";

  return (
    <Workbench.Pane
      className={cn(
        "grid-rows-[auto_1fr]",
        "col-span-1 lg:border-l-2 border-l-ludo-surface lg:col-span-3 flex flex-col min-h-0",
        className,
      )}
    >
      <Workbench.Pane.Winbar
        className={hideWinbarOnMobile ? "hidden lg:block" : undefined}
      >
        <div className="min-w-0 flex-1 rounded-md border border-white/10 bg-black/20 px-2 py-1">
          <p className="min-w-0 truncate text-[11px] text-ludo-white-bright/70">
            {previewUrl || "Missing preview URL configuration"}
          </p>
        </div>
        <div className="ml-2 flex items-center gap-1">
          <IconButton
            dataTestId="refresh-live-preview-icon"
            iconName="ArrowPathIcon"
            disabled={!previewUrl}
            onClick={() => setManualRefreshVersion((prev) => prev + 1)}
          />
          <IconButton
            dataTestId="open-live-preview-icon"
            iconName="ArrowTopRightOnSquareIcon"
            disabled={!previewUrl}
            onClick={() => {
              if (!previewUrl) return;
              window.open(previewUrl, "_blank", "noopener,noreferrer");
            }}
          />
        </div>
      </Workbench.Pane.Winbar>

      <Workbench.Pane.Content
        dataTestId="project-live-preview"
        className="p-0 gap-0 overflow-hidden h-full min-h-0 flex-1"
      >
        {previewUrl ? (
          <iframe
            title="Project live preview"
            src={iframeSrc}
            className="h-full w-full flex-1 min-h-0 block bg-white border-0"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm text-ludo-white-bright/70">
            Live preview is unavailable because VITE_WEB_CDN_BASE_URL is not
            set.
          </div>
        )}
      </Workbench.Pane.Content>
    </Workbench.Pane>
  );
}
