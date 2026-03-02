import type { ReactNode } from "react";
import { motion } from "motion/react";

type OnboardingStageShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function OnboardingStageShell({
  title,
  subtitle,
  children,
}: OnboardingStageShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex flex-col items-center"
    >
      <h1 className="text-3xl text-center font-bold text-white tracking-tight">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-center text-ludoAltText text-sm max-w-md">
          {subtitle}
        </p>
      )}

      <div className="mt-4 mb-2 h-px w-16 rounded-full bg-ludo-accent/40" />

      <div className="grid lg:grid-cols-2 py-6 gap-5 w-full">{children}</div>
    </motion.div>
  );
}
