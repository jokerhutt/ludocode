import { LudoVideo } from "@ludocode/design-system/primitives/ludo-video";
import { showcaseVideoUrl } from "@/constants/media/showcaseMedia.ts";

type DocsShowcaseVideoProps = {
  file: string;
};

export function DocsShowcaseVideo({ file }: DocsShowcaseVideoProps) {
  return (
    <LudoVideo
      src={showcaseVideoUrl(file)}
      controls
      className="my-6 rounded-lg border border-ludo-border"
      videoClassName="object-contain"
    />
  );
}
