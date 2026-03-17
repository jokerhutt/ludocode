import { useCallback, useMemo } from "react";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { router } from "@/main";

type Args = {
  position: number;
};

export type useExerciseNavigationResponse = {
  canGoBack: boolean;
  goBack: () => void;
};

export function useExerciseNavigation({
  position,
}: Args): useExerciseNavigationResponse {
  const canGoBack = useMemo(() => position > 1, [position]);

  const goBack = useCallback(() => {
    if (!canGoBack) return;
    router.navigate(ludoNavigation.lesson.toPreviousExercise(position));
  }, [canGoBack, position]);

  return {
    canGoBack,
    goBack,
  };
}
