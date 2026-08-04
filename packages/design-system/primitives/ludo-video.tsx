import { useEffect, useRef, useState } from "react";
import { cn } from "../cn-utils";

type LudoVideoProps = {
  src: string;
  poster?: string;
  aspectRatio?: string;
  className?: string;
  videoClassName?: string;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  rootMargin?: string;
};

export function LudoVideo({
  src,
  poster,
  aspectRatio = "16 / 9",
  className,
  videoClassName,
  autoPlay = false,
  loop = false,
  controls = false,
  rootMargin = "300px",
}: LudoVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio }}
    >
      {shouldLoad && !failed && (
        <video
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          controls={controls}
          muted
          playsInline
          preload={autoPlay ? "auto" : "metadata"}
          onLoadedData={() => setReady(true)}
          onError={() => setFailed(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            ready ? "opacity-100" : "opacity-0",
            videoClassName,
          )}
        />
      )}

      {!ready && (
        <div
          aria-hidden
          className="absolute inset-0 bg-ludo-surface-dim flex items-center justify-center"
        >
          {failed ? (
            <span className="text-xs text-ludo-white-dim">
              Video unavailable
            </span>
          ) : (
            <div className="h-full w-full animate-pulse bg-linear-to-r from-ludo-surface-dim via-ludo-surface to-ludo-surface-dim" />
          )}
        </div>
      )}
    </div>
  );
}
