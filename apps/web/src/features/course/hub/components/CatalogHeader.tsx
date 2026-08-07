export function CatalogHeader() {
  return (
    <header className="flex flex-col gap-5">
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ludo-accent-muted">
          Course library
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-ludo-white-bright lg:text-4xl">
          Catalog
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-ludo-white">
          Browse all available courses and pick your next adventure
        </p>
      </div>

      <div className="h-px w-full bg-ludo-surface" />
    </header>
  );
}
