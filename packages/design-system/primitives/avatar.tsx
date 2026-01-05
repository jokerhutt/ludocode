import { useState } from "react";

type AvatarProps = {
  src: string;
};

export function Avatar({ src }: AvatarProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative lg:w-32 w-16 h-16 lg:h-32 rounded-full overflow-hidden">
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
