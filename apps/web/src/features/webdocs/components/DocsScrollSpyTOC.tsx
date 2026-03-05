import { useEffect, useRef, useState } from "react";

export type TocHeading = {
  id: string;
  text: string;
  level: number; // 2 = h2, 3 = h3
};

type DocsScrollSpyTOCProps = {
  headings: TocHeading[];
  contentRef: React.RefObject<HTMLDivElement | null>;
};

export function DocsScrollSpyTOC({
  headings,
  contentRef,
}: DocsScrollSpyTOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!contentRef.current || headings.length === 0) return;

    // Disconnect previous observer
    observerRef.current?.disconnect();

    const callback: IntersectionObserverCallback = (entries) => {
      // Find the first heading that is intersecting, starting from top
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
        // Pick the one closest to the top
        const closest = visibleEntries.reduce((prev, curr) =>
          prev.boundingClientRect.top < curr.boundingClientRect.top
            ? prev
            : curr,
        );
        setActiveId(closest.target.id);
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      root: contentRef.current,
      rootMargin: "-10% 0px -70% 0px",
      threshold: 0,
    });

    // Observe all heading elements
    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings, contentRef]);

  if (headings.length === 0) return null;

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el && contentRef.current) {
      // Scroll within the content container
      const container = contentRef.current;
      const elTop = el.offsetTop - container.offsetTop;
      container.scrollTo({ top: elTop - 20, behavior: "smooth" });
    }
  };

  return (
    <aside className="sticky top-0 h-full overflow-y-auto scrollbar-none pt-1 pb-8">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-ludo-white-dim mb-3 px-2">
        On this page
      </h4>
      <ul className="flex flex-col gap-0.5">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          const indent = heading.level === 3 ? "pl-5" : "pl-2";

          return (
            <li key={heading.id}>
              <button
                onClick={() => handleClick(heading.id)}
                className={`
                  w-full text-left ${indent} pr-2 py-1 text-[13px] rounded-md
                  transition-all duration-150 leading-snug
                  ${
                    isActive
                      ? "text-ludo-accent-muted font-medium bg-ludo-accent/10"
                      : "text-ludo-white-dim hover:text-ludo-white"
                  }
                `}
              >
                {heading.text}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

// ─── Helper: extract headings from markdown ─────────────────────────────────

export function extractHeadingsFromMarkdown(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const lines = markdown.split("\n");

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/[`*_~]/g, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      headings.push({ id, text, level });
    }
  }

  return headings;
}
