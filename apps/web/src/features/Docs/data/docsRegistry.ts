
import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";

// ─── Types ──────────────────────────────────────────────────────────────────

export type DocsFrontmatter = {
  title: string;
  slug: string;
  section: string;
  order: number;
  description?: string;
};

export type MdxComponent = ComponentType<{ components?: MDXComponents }>;

export type DocsEntry = {
  frontmatter: DocsFrontmatter;
  Component: MdxComponent;
};

export type DocsSection = {
  title: string;
  entries: DocsEntry[];
};

// ─── Glob import ───────────────────────────────

const mdxModules = import.meta.glob<{
  default: MdxComponent;
  frontmatter: DocsFrontmatter;
}>("../content/*.mdx", { eager: true });

// ─── Build flat list of entries ─────────────────────────────────────────────

const allEntries: DocsEntry[] = Object.values(mdxModules).map((mod) => ({
  frontmatter: mod.frontmatter,
  Component: mod.default,
}));

// Sort globally by order
allEntries.sort((a, b) => a.frontmatter.order - b.frontmatter.order);

// ─── Group into sections ─────────────

const sectionOrder: string[] = [];
const sectionMap = new Map<string, DocsEntry[]>();

for (const entry of allEntries) {
  const sec = entry.frontmatter.section;
  if (!sectionMap.has(sec)) {
    sectionOrder.push(sec);
    sectionMap.set(sec, []);
  }
  sectionMap.get(sec)!.push(entry);
}

export const docsSections: DocsSection[] = sectionOrder.map((title) => ({
  title,
  entries: sectionMap.get(title)!,
}));

// ─── Helpers ────────────────────────────────────────────────────────────────

export const defaultSlug = allEntries[0]?.frontmatter.slug ?? "";

export function findEntry(slug: string): DocsEntry | undefined {
  return allEntries.find((e) => e.frontmatter.slug === slug);
}
