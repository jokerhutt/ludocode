import { FallbackLayout } from "@/layouts/fallback/FallbackLayout.tsx";

export function MaintenancePage() {
  return (
    <FallbackLayout>
      <div className="w-full h-full grid grid-cols-12">
        <div className="flex flex-col col-span-12 items-center justify-center text-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <span className="text-7xl lg:text-8xl font-bold text-ludo-white/20 tracking-widest">
              503
            </span>
            <div className="w-12 h-[2px] bg-ludo-accent-dim rounded-full" />
          </div>

          <div className="flex flex-col gap-3 max-w-md">
            <h1 className="text-xl lg:text-2xl font-semibold text-ludo-white-bright">
              We're under maintenance
            </h1>
            <p className="text-sm lg:text-base text-ludo-accent-muted">
              We're making some improvements. Please check back shortly.
            </p>
          </div>
        </div>
      </div>
    </FallbackLayout>
  );
}
