import { docsSections, type DocsSection } from "../data/docsRegistry";

type DocsSidebarProps = {
  activeSlug: string;
  onNavigate: (slug: string) => void;
};

export function DocsSidebar({ activeSlug, onNavigate }: DocsSidebarProps) {
  return (
    <aside className="sticky top-0 h-full overflow-y-auto scrollbar-ludo-accent pr-4 pb-8">
      {/* Logo / Title */}
      <div className="mb-6 pt-1">
        <h2 className="text-lg font-bold text-ludo-white-bright tracking-tight">
          Documentation
        </h2>
        <p className="text-xs text-ludo-white-dim mt-0.5">Ludocode</p>
      </div>

      {/* Nav Sections */}
      <nav className="flex flex-col gap-5">
        {docsSections.map((section) => (
          <SidebarSection
            key={section.title}
            section={section}
            activeSlug={activeSlug}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </aside>
  );
}

// ─── Section ────────────────────────────────────────────────────────────────

type SidebarSectionProps = {
  section: DocsSection;
  activeSlug: string;
  onNavigate: (slug: string) => void;
};

function SidebarSection({
  section,
  activeSlug,
  onNavigate,
}: SidebarSectionProps) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-ludo-white-dim mb-2 px-2">
        {section.title}
      </h3>
      <ul className="flex flex-col gap-0.5">
        {section.entries.map((entry) => {
          const isActive = entry.frontmatter.slug === activeSlug;
          return (
            <li key={entry.frontmatter.slug}>
              <button
                onClick={() => onNavigate(entry.frontmatter.slug)}
                className={`
                  w-full text-left px-3 py-1.5 rounded-md text-sm transition-all duration-150
                  ${
                    isActive
                      ? "bg-ludo-accent/15 text-ludo-accent-muted font-medium"
                      : "text-ludo-white hover:text-ludo-white-bright hover:bg-white/5"
                  }
                `}
              >
                {entry.frontmatter.title}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
