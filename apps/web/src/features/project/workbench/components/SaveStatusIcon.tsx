import {
  CustomIcon,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import { testIds } from "@ludocode/util/test-ids";

type SaveStatusIconProps = {
  isSaving: boolean;
  isSaved: boolean;
  error: Error | null;
  lastSavedAt: Date | null;
};

export function SaveStatusIcon({
  isSaving,
  isSaved,
  error,
}: SaveStatusIconProps) {
  const status: IconName = !!error
    ? "CloudError"
    : isSaving
      ? "CloudLoad"
      : isSaved
        ? "CloudYes"
        : "CloudError";

  return (
    <div
      data-testid={testIds.project.cloudIcon(status)}
      className="flex items-center gap-4"
    >
      <CustomIcon className="h-5" iconName={status} />
    </div>
  );
}
