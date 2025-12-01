export function TreeItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="relative w-6 mr-2">
        <span className="absolute left-1/2 top-0 h-full w-px bg-ludoLightPurple"></span>

        <span className="absolute left-1/2 top-6.5 w-3 h-px bg-ludoLightPurple"></span>
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
}
