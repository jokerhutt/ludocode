import { createFileRoute } from "@tanstack/react-router";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LudoCard } from "@ludocode/design-system/primitives/ludo-card";
import { HeroIcon } from "@ludocode/design-system/primitives/hero-icon";
import type { IconName } from "@ludocode/design-system/primitives/hero-icon";
import { router } from "@/main";
import { ludoNavigation } from "@/constants/ludoNavigation";

export const Route = createFileRoute("/_resources/")({
  component: LandingPage,
});

const GITHUB_URL = "https://github.com/jokerhutt/ludocode";

const features: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "CodeBracketIcon",
    title: "Interactive Exercises",
    description:
      "Practice programming with small, interactive lessons.",
  },
  {
    icon: "PlayIcon",
    title: "Editor & Code Execution",
    description:
      "Write & run code directly from the site using our editor.",
  },
  {
    icon: "WrenchScrewdriverIcon",
    title: "Make your own courses",
    description:
      "Learn Python, Go, C#, Swift, Lua, and more — all in one place.",
  },
  {
    icon: "FireIcon",
    title: "Streaks & Points",
    description: "Maintain streaks & collect points by completing exercises.",
  },
  {
    icon: "SparklesIcon",
    title: "Context aware chatbot",
    description:
      "Get help from a chatbot that understands the current situation.",
  },
  {
    icon: "UserGroupIcon",
    title: "Community Driven",
    description:
      "You have a say and can help shape the future of this project.",
  },
];

function LandingPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="px-6 lg:px-18 py-16 lg:pt-32 lg:pb-24 flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-6xl font-bold text-ludo-white-bright leading-tight">
          Practice programming in small steps
        </h1>
        <p className="text-base lg:text-lg text-ludo-white max-w-xl">
          Ludocode is an open-source platform for learning programming through
          small, interactive exercises.
        </p>
        <div className="flex gap-4 mt-4 w-full">
          <LudoButton
            variant="alt"
            className="flex-1"
            onClick={() => router.navigate(ludoNavigation.auth.register())}
          >
            Get Started
          </LudoButton>
          <LudoButton
            variant="default"
            className="flex-1 "
            onClick={() => window.open(GITHUB_URL, "_blank")}
          >
            View Source
          </LudoButton>
        </div>
      </section>

      {/* Preview */}
      <section className="px-6 lg:px-18 flex justify-center">
        <div className="w-full max-w-4xl rounded-lg overflow-hidden border border-ludo-border">
          <video
            src="/video/ludoshowcase.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full block"
          />
        </div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-18 py-20 lg:py-28 flex flex-col items-center gap-12 max-w-5xl mx-auto">
        <h2 className="text-2xl lg:text-4xl font-bold text-ludo-white-bright">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {features.map((f) => (
            <LudoCard key={f.title} className="p-6 flex flex-col gap-3">
              <HeroIcon
                iconName={f.icon}
                className="h-7 w-7 text-ludo-accent-muted"
              />
              <h3 className="text-base font-semibold text-ludo-white-bright">
                {f.title}
              </h3>
              <p className="text-sm text-ludo-white leading-relaxed">
                {f.description}
              </p>
            </LudoCard>
          ))}
        </div>
      </section>

      {/* Open Source */}
      <section className="px-6 lg:px-18 flex flex-col items-center gap-8 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl lg:text-4xl font-bold text-ludo-white-bright">
          Open Source
        </h2>
        <p className="text-base lg:text-lg text-ludo-white max-w-xl">
          Ludocode is fully open source. Browse the code, contribute features,
          or self-host your own instance.
        </p>

        <div className="w-full max-w-md flex flex-col gap-5">
          <LudoButton
            variant="default"
            onClick={() => window.open(GITHUB_URL, "_blank")}
          >
            <img
              src="/icons/GithubIcon.svg"
              className="h-5 w-5 invert"
              alt=""
            />
            Star us on GitHub
          </LudoButton>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6 lg:px-18 py-20 lg:py-28 flex flex-col items-center gap-6 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-ludo-white-bright">
          Ready to start?
        </h2>
        <p className="text-base text-ludo-white max-w-md">
          Create a free account and begin your first exercise in minutes.
        </p>
        <div className="w-full max-w-xs">
          <LudoButton
            variant="alt"
            onClick={() => router.navigate(ludoNavigation.auth.register())}
          >
            Sign up for free
          </LudoButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-18 py-10 text-center border-t border-ludo-border">
        <p className="text-sm text-ludo-white-dim">
          Open source under the GNU AGPL v3
        </p>
      </footer>
    </div>
  );
}
