import type { ReactNode } from "react";

type ExerciseCodeContainerProps = {
  children: ReactNode;
};

export function ExerciseCodeContainer({
  children,
}: ExerciseCodeContainerProps) {
  return (
    <div className="w-full min-h-40 lg:min-h-66 rounded-3xl bg-ludoGrayLight">
      <div className="w-full h-6 rounded-t-3xl bg-pythonYellow"></div>
      <div className="w-full h-full p-6">
        {children}
      </div>
    </div>
  );
}
