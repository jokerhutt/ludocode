import { useEffect, useRef } from "react";

type useTimedLottieProps = { minusFrames: number };

export function useTimedLottie({ minusFrames }: useTimedLottieProps) {
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    const inst = lottieRef.current;
    if (!inst) return;

    const totalFrames = inst.getDuration(true);
    const stopFrame = totalFrames - minusFrames;

    inst.playSegments([0, stopFrame], true);

    return () => {
      inst.stop();
    };
  }, []);

  return { lottieRef };
}
