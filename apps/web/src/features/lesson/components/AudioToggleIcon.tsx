import { qo } from "@/queries/definitions/queries";
import { useEditPreferences } from "@/queries/mutations/useEditPreferences";
import { useSuspenseQuery } from "@tanstack/react-query";
import { VolumeIcon, VolumeOffIcon } from "lucide-react";

export function AudioToggleIcon() {
  const { data: preferences } = useSuspenseQuery(qo.preferences());
  const audioEnabled = preferences.audioEnabled;

  const mutation = useEditPreferences();

  const handleToggle = () => {
    if (mutation.isPending) return;
    mutation.mutate({ key: "AUDIO", value: !audioEnabled });
  };

  return (
    <div className="text-ludo-white">
      {audioEnabled ? (
        <VolumeIcon
          className="hover:cursor-pointer w-5 h-5"
          strokeWidth={1}
          onClick={() => handleToggle()}
        />
      ) : (
        <VolumeOffIcon
          className=" w-5 h-5 hover:cursor-pointer"
          onClick={() => handleToggle()}
        />
      )}
    </div>
  );
}
