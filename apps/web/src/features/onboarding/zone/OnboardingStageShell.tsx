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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="flex flex-col justify-center items-center w-full"
    >
      <h1 className="text-3xl text-center font-bold text-ludo-white-bright tracking-tight">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-center text-ludo-white text-sm max-w-md">
          {subtitle}
        </p>
      )}

      <div className="mt-4 mb-2 h-px w-16 rounded-full bg-ludo-accent-disabled" />

      <div className="grid lg:grid-cols-2 py-6 gap-5 w-full">{children}</div>
    </motion.div>
  );
}
