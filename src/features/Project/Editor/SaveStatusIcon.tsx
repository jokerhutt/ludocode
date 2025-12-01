import { CustomIcon, type IconName } from "@/components/LudoComponents/Atoms/Icons/CustomIcon";

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
  lastSavedAt,
}: SaveStatusIconProps) {
  const status: IconName = !!error
    ? "CloudError"
    : isSaving
    ? "CloudLoad"
    : isSaved
    ? "CloudYes"
    : "CloudError";

  return (
    <div className="flex items-center gap-4">
      <CustomIcon className="h-5" iconName={status} />
    </div>
  );
}
