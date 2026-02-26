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
    <div className="relative rounded-xl bg-ludo-surface/40 border border-ludo-accent-muted/30 px-6 py-5 flex w-full items-center justify-between text-white gap-x-8 gap-y-3 flex-wrap">
      <div className="flex flex-col gap-0.5 min-w-0">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm lg:text-base text-ludoAltText leading-relaxed">
          {subtitle}
        </p>
      </div>
      {children && <div className="flex shrink-0 items-center">{children}</div>}
    </div>
  );
}
