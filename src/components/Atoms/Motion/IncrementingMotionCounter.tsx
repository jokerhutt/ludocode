import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

type IncrementingMotionCounterProps = { oldCount: number; newCount: number };

export function IncrementingMotionCounter({
  oldCount,
  newCount,
}: IncrementingMotionCounterProps) {
  const [displayCount, setDisplayCount] = useState(oldCount);

  useEffect(() => {
    const timeout = setTimeout(() => setDisplayCount(newCount), 300);
    return () => clearTimeout(timeout);
  }, [newCount]);

  return (
    <div className="relative h-10 overflow-hidden text-center text-3xl font-bold">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={displayCount}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {displayCount}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
