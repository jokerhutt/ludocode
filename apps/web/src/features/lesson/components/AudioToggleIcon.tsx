import { VolumeIcon, VolumeOffIcon } from "lucide-react";

type AudioToggleIconProps = {
  audioEnabled: boolean;
};

export function AudioToggleIcon({ audioEnabled }: AudioToggleIconProps) {
  return (
    <div className="text-ludo-white">
      {audioEnabled ? (
        <VolumeIcon className="w-5 h-5" strokeWidth={1} />
      ) : (
        <VolumeOffIcon className="w-5 h-5" />
      )}
    </div>
  );
}
