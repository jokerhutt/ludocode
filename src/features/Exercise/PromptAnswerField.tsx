import type { ReactNode } from "react";

type PromptAnswerFieldProps = {
    children: ReactNode;
}

export function PromptAnswerField({ children }: PromptAnswerFieldProps) {
  return (
    <span className="inline-block align-baseline pb-0.5">
      {children}
    </span>
  );
}
