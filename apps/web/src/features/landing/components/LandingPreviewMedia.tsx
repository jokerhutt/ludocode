import { LudoVideo } from "@ludocode/design-system/primitives/ludo-video";
import { LANDING_SHOWCASE_VIDEO } from "@/constants/media/showcaseMedia.ts";

export function LandingPreviewMedia() {
  return (
    <section className="px-6 lg:px-18 flex justify-center">
      <div className="w-full max-w-4xl rounded-lg overflow-hidden border border-ludo-border">
        <LudoVideo
          src={LANDING_SHOWCASE_VIDEO}
          autoPlay
          loop
          aspectRatio="16 / 10"
        />
      </div>
    </section>
  );
}
