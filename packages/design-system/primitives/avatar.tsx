import { useState } from "react";
import { cn } from "../cn-utils";

type AvatarProps = {
  src: string;
  className?: string;
};

export function Avatar({ src, className }: AvatarProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative border-ludoLightPurple border-4 lg:w-26 w-16 h-16 lg:h-26 rounded-full overflow-hidden",
        className,
      )}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
      )}

      <img
        src={src}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`h-full w-full object-fit`}
        alt="User avatar"
      />
    </div>
  );
}
