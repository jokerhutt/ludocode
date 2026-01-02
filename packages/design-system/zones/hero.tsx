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
    <div className="pb-5 grid border-b-ludoLightPurple/90 border-b-2 grid-cols-[3fr_2fr] lg:grid-cols-2 grid-rows-[auto_auto] text-white gap-y-2 gap-x-8">
      <h1 className="text-2xl col-span-2">{title}</h1>
      <p className="text-sm lg:text-lg text-ludoAltText">{subtitle}</p>
      <div className="flex justify-end">{children}</div>
    </div>
  );
}
