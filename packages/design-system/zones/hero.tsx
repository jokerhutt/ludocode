import type { ReactNode } from "react";

export type HeroContentProps = {
  title: string;
  subtitle: string;
};

export type HeroProps = HeroContentProps & {
  children?: ReactNode;
};

export function Hero({ title, subtitle, children }: HeroProps) {
  return (
    <div className="relative rounded-xl bg-ludo-surface-dim px-4 lg:px-6 py-5 flex flex-col w-full items-center justify-center text-ludo-white-bright gap-x-8 gap-y-3">
      <div className="flex flex-col items-center gap-0.5 min-w-0">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm hidden lg:block text-center text-base text-ludo-white-bright/70 leading-relaxed">
          {subtitle}
        </p>
      </div>
      {children && (
        <div className="flex w-full items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
