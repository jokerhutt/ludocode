import { ludoNavigation } from "@/constants/ludoNavigation";
import { router } from "@/main";
import { LandingHero } from "./components/LandingHero";
import { LandingFeatures } from "./components/LandingFeatures";
import { LandingPreviewMedia } from "./components/LandingPreviewMedia";
import { FRONTEND_REPO_URL } from "@/constants/url/repo";
import { LandingCTA } from "./components/LandingCTA";
import { useEffect } from "react";
import { track } from "@/analytics/track";

export function LandingPage() {
  useEffect(() => {
    track({ event: "LANDING_PAGE_VIEW" });
  }, []);

  return (
    <div className="w-full">
      {/* Hero */}
      <LandingHero />

      {/* Preview */}
      <LandingPreviewMedia />

      <LandingFeatures />

      {/* Open Source */}
      <LandingCTA
        className="pt-0"
        variant="large"
        title="Open Source"
        subtitle="Ludocode is fully open source. Browse the code, contribute features,
          or self-host your own instance."
        onClick={() => {
          track({
            event: "SOURCE_CODE_CLICK",
            properties: { source: "landing_cta_bottom" },
          });
          window.open(FRONTEND_REPO_URL, "_blank");
        }}
      >
        <img src="/icons/GithubIcon.svg" className="h-5 w-5 invert" alt="" />
        Star us on GitHub
      </LandingCTA>

      <LandingCTA
        className="pb-20"
        title="Ready to start?"
        buttonVariant="alt"
        subtitle="Create a free account and begin your first exercise in less than a minute."
        onClick={() => {
          track({
            event: "SIGNUP_CLICK",
            properties: { source: "landing_cta_bottom" },
          });
          router.navigate(ludoNavigation.auth.register(false));
        }}
      >
        Sign up for free
      </LandingCTA>

      {/* Footer */}
      <footer className="px-6 lg:px-18 py-10 text-center border-t border-ludo-border">
        <p className="text-sm text-ludo-white-dim">
          Open source under the GNU AGPL v3
        </p>
      </footer>
    </div>
  );
}
