import type { ReactNode } from "react";

type ExerciseCodeContainerProps = {
  children: ReactNode;
};

export function ExerciseCodeContainer({
  children,
}: ExerciseCodeContainerProps) {
  return (
    <div className="w-full min-h-46 rounded-4xl bg-ludoGrayLight">
      <div className="w-full h-10 rounded-t-4xl bg-ludoYellow"></div>
      <div className="w-full h-full p-6">
        {children}
      </div>
    </div>
  );
}
