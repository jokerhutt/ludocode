import { HeroIcon } from "@ludocode/design-system/primitives/hero-icon";
import { LudoCard } from "@ludocode/design-system/primitives/ludo-card";
import { landingPageFeatures } from "../content";

type LandingFeaturesProps = {};

export function LandingFeatures({}: LandingFeaturesProps) {
  return (
    <section className="px-6 lg:px-18 py-20 lg:py-28 flex flex-col items-center gap-12 max-w-5xl mx-auto">
      <h2 className="text-2xl lg:text-4xl font-bold text-ludo-white-bright">
        Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {landingPageFeatures.map((f) => (
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
  );
}
