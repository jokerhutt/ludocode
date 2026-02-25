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
    <div className="pb-5  border-b-ludo-accent-muted border-b-2 flex w-full justify-between text-white gap-y-2 gap-x-8">
      <div className="flex w-full flex-col">
        <h1 className="text-2xl ">{title}</h1>
        <p className="text-sm lg:text-lg text-ludoAltText">{subtitle}</p>
      </div>
      <div className="flex w-auto lg:w-full justify-end">{children}</div>
    </div>
  );
}
