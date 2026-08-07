import type { ReactNode } from "react";
import { cn } from "../cn-utils";

export type PageMastheadProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
  className?: string;
};

export function PageMasthead({
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: PageMastheadProps) {
  return (
    <header className={cn("flex flex-col gap-5", className)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ludo-accent-muted">
            {eyebrow}
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-ludo-white-bright lg:text-4xl">
            {title}
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-ludo-white">
            {subtitle}
          </p>
        </div>
        {children && <div className="shrink-0">{children}</div>}
      </div>

      <div className="h-px w-full bg-ludo-surface" />
    </header>
  );
}

export type SectionHeadingProps = {
  label: string;
  children?: ReactNode;
  className?: string;
};

export function SectionHeading({
  label,
  children,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <h2 className="shrink-0 text-xs font-semibold uppercase tracking-widest text-ludo-white-dim">
        {label}
      </h2>
      <div className="h-px flex-1 bg-ludo-surface" />
      {children}
    </div>
  );
}
