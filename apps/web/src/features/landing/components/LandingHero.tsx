import { track } from "@/analytics/track";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { FRONTEND_REPO_URL } from "@/constants/url/repo";
import { router } from "@/main";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";

export function LandingHero() {
  return (
    <section className="px-6 lg:px-18 py-16 lg:pt-32 lg:pb-24 flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
      <h1 className="text-4xl lg:text-6xl font-bold text-ludo-white-bright leading-tight">
        Learn programming interactively
      </h1>
      <p className="text-base lg:text-lg text-ludo-white max-w-xl">
        Open-source platform for learning programming through approachable,
        interactive exercises.
      </p>
      <div className="flex gap-4 mt-4 h-10 w-full">
        <LudoButton
          variant="alt"
          className="flex-1 h-full"
          onClick={() => {
            track({
              event: "SIGNUP_CLICK",
              properties: { source: "landing_cta_main" },
            });
            router.navigate(ludoNavigation.auth.register(false));
          }}
        >
          Get Started
        </LudoButton>
        <LudoButton
          variant="default"
          className="flex-1 h-full"
          onClick={() => {
            track({
              event: "SOURCE_CODE_CLICK",
              properties: { source: "landing_cta_main" },
            });
            window.open(FRONTEND_REPO_URL, "_blank");
          }}
        >
          View Source
        </LudoButton>
      </div>
    </section>
  );
}
