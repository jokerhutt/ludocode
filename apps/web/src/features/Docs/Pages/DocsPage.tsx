import { useCallback, useEffect, useRef, useState } from "react";
import { defaultSlug, findEntry } from "../data/docsRegistry";
import { mdxComponents } from "../components/MdxComponents";
import { DocsSidebar } from "../components/DocsSidebar";
import {
  DocsScrollSpyTOC,
  type TocHeading,
} from "../components/DocsScrollSpyTOC";

// ─── Extract headings from the rendered DOM ─────────────────────────────────

function extractHeadingsFromDOM(container: HTMLElement | null): TocHeading[] {
  if (!container) return [];
  const nodes = container.querySelectorAll("h2[id], h3[id]");
  return Array.from(nodes).map((el) => ({
    id: el.id,
    text: el.textContent ?? "",
    level: el.tagName === "H2" ? 2 : 3,
  }));
}

// ─── Page ───────────────────────────────────────────────────────────────────

export function DocsPage() {
  const [activeSlug, setActiveSlug] = useState(defaultSlug);
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const entry = findEntry(activeSlug) ?? findEntry(defaultSlug)!;
  const { Component } = entry;

  const handleNavigate = useCallback((slug: string) => {
    setActiveSlug(slug);
    setSidebarOpen(false);
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Re-extract headings after MDX renders
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeadings(extractHeadingsFromDOM(contentRef.current));
    }, 60);
    return () => clearTimeout(timer);
  }, [activeSlug]);

  // Close sidebar on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-[240px_1fr_200px] gap-0 h-full min-h-0 max-w-350 mx-auto">
      {/* ── Mobile top bar ───────────────────────────────────────────── */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-ludo-surface/95 backdrop-blur border-b border-ludo-border/40">
        <button
          onClick={() => setSidebarOpen((o) => !o)}
          aria-label="Toggle navigation"
          className="p-1.5 rounded-md text-ludoAltText hover:bg-white/10 transition-colors"
        >
          {sidebarOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 5h14M3 10h14M3 15h14" />
            </svg>
          )}
        </button>
        <span className="text-sm font-medium text-white truncate">
          {entry.frontmatter.title}
        </span>
      </div>

      {/* ── Mobile sidebar overlay ───────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Left sidebar ─────────────────────────────────────────────── */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 lg:w-auto
          border-r border-ludo-border/40 px-4 py-6 min-h-0
          bg-ludo-background lg:bg-transparent
          overflow-y-auto scrollbar-ludo-accent
          transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <DocsSidebar activeSlug={activeSlug} onNavigate={handleNavigate} />
      </div>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div
        ref={contentRef}
        className="overflow-y-auto scrollbar-ludo-accent px-5 sm:px-8 lg:px-10 py-6 lg:py-8 min-h-0"
      >
        {/* Article title */}
        <div className="mb-2">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {entry.frontmatter.title}
          </h1>
          {entry.frontmatter.description && (
            <p className="text-sm text-ludo-text-dim mt-1">
              {entry.frontmatter.description}
            </p>
          )}
          <div className="h-px bg-linear-to-r from-ludo-accent/60 to-transparent mt-3" />
        </div>

        {/* MDX content */}
        <Component components={mdxComponents} />

        {/* Bottom spacer */}
        <div className="h-24" />
      </div>

      {/* ── Right TOC (hidden on mobile/tablet) ──────────────────────── */}
      <div className="hidden lg:block border-l border-ludo-border/40 px-4 py-6 min-h-0 overflow-hidden">
        <DocsScrollSpyTOC headings={headings} contentRef={contentRef} />
      </div>
    </div>
  );
}
