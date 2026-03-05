// ─── MDX Components ─────────────────────────────────────────────────────────
// Provides styled replacements for standard HTML elements rendered by MDX,
// plus custom components (<Tip>, <Tabs>, <CodeBlock>) that authors can use
// directly inside .mdx files without any import.
// ─────────────────────────────────────────────────────────────────────────────

import type { ComponentType, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { DocsTipCard } from "./DocsTipCard";
import { DocsTabs } from "./DocsTabs";

// ─── Ludocode code theme ────────────────────────────────────────────────────

const ludoCodeTheme: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': {
    color: "#c9d1d9",
    fontFamily: '"DMMono", monospace',
    fontSize: "0.875rem",
    lineHeight: "1.6",
  },
  'pre[class*="language-"]': {
    color: "#c9d1d9",
    fontFamily: '"DMMono", monospace',
    fontSize: "0.875rem",
    lineHeight: "1.6",
    background: "#2f3553",
    padding: "1rem",
    margin: "0",
    overflow: "auto",
    borderRadius: "0",
  },
  comment: { color: "#6b7394" },
  prolog: { color: "#6b7394" },
  doctype: { color: "#6b7394" },
  cdata: { color: "#6b7394" },
  punctuation: { color: "#8b949e" },
  property: { color: "#79c0ff" },
  tag: { color: "#7ee787" },
  boolean: { color: "#79c0ff" },
  number: { color: "#79c0ff" },
  constant: { color: "#79c0ff" },
  symbol: { color: "#79c0ff" },
  selector: { color: "#7ee787" },
  "attr-name": { color: "#d2a8ff" },
  string: { color: "#a5d6ff" },
  char: { color: "#a5d6ff" },
  builtin: { color: "#ffa657" },
  operator: { color: "#ff7b72" },
  entity: { color: "#ffa657" },
  url: { color: "#a5d6ff" },
  keyword: { color: "#ff7b72" },
  regex: { color: "#7ee787" },
  important: { color: "#ffa657", fontWeight: "bold" },
  atrule: { color: "#d2a8ff" },
  function: { color: "#d2a8ff" },
  "class-name": { color: "#ffa657" },
  variable: { color: "#ffa657" },
  deleted: { color: "#ffa198", background: "#490202" },
  inserted: { color: "#aff5b4", background: "#033a16" },
};

// ─── CodeBlock component for MDX ────────────────────────────────────────────

function CodeBlock({
  language,
  children,
}: {
  language: string;
  children: string;
}) {
  return (
    <div className="my-4 rounded-lg overflow-x-auto border border-ludo-border">
      <div className="flex items-center justify-between px-4 py-1.5 bg-ludo-surface-dim border-b border-ludo-border">
        <span className="text-xs font-medium text-ludo-white-dim uppercase tracking-wider">
          {language}
        </span>
      </div>
      <SyntaxHighlighter
        style={ludoCodeTheme}
        language={language}
        PreTag="div"
        customStyle={{
          background: "#2f3553",
          margin: 0,
          padding: "1rem",
          fontSize: "0.8125rem",
          lineHeight: "1.6",
        }}
        codeTagProps={{ style: { fontFamily: '"DMMono", monospace' } }}
      >
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  );
}

// ─── MDX component map ──────────────────────────────────────────────────────

export const mdxComponents: MDXComponents = {
  // ── Custom components available in MDX ────────────
  Tip: DocsTipCard as ComponentType,
  Tabs: DocsTabs as ComponentType,
  CodeBlock: CodeBlock as ComponentType,

  // ── Heading overrides (IDs added by rehype-slug) ──
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-xl font-bold text-ludo-white-bright mt-10 mb-4 pb-2 border-b border-ludo-border/50 scroll-mt-6"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-lg font-semibold text-ludo-white-bright mt-7 mb-3 scroll-mt-6"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="text-base font-semibold text-ludo-white-bright mt-5 mb-2"
      {...props}
    />
  ),

  // ── Body text ─────────────────────────────────────
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-sm text-ludo-white leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc list-outside ml-5 mb-4 space-y-1.5 text-sm text-ludo-white"
      {...props}
    />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-outside ml-5 mb-4 space-y-1.5 text-sm text-ludo-white"
      {...props}
    />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-ludo-white-bright" {...props} />
  ),

  // ── Blockquote ────────────────────────────────────
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-ludo-accent-disabled bg-ludo-accent/5 pl-4 py-3 pr-3 my-4 rounded-r-md text-sm text-ludo-white"
      {...props}
    />
  ),

  // ── Links ─────────────────────────────────────────
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-ludo-accent-muted hover:text-ludo-white-bright underline underline-offset-2 transition-colors"
      {...props}
    />
  ),

  // ── Horizontal rule ───────────────────────────────
  hr: () => <hr className="border-ludo-surface my-8" />,

  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      className="my-6 rounded-lg border border-ludo-border max-w-full"
      {...props}
    />
  ),

  // ── Tables ────────────────────────────────────────
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-5 rounded-lg border border-ludo-border">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-ludo-surface-dim text-left" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ludo-accent-muted border-b border-ludo-border"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-2.5 text-sm text-ludo-white border-b border-ludo-border/40"
      {...props}
    />
  ),

  pre: ({ children }: { children?: ReactNode }) => {
    if (
      children &&
      typeof children === "object" &&
      "props" in (children as { props?: unknown })
    ) {
      const codeProps = (children as { props: Record<string, unknown> }).props;
      const className = (codeProps?.className as string) ?? "";
      const langMatch = /language-(\w+)/.exec(className);
      const language = langMatch?.[1] ?? "text";
      const codeString = String(codeProps?.children ?? "").replace(/\n$/, "");

      return (
        <div className="my-4 rounded-lg overflow-x-auto border border-ludo-border">
          <div className="flex items-center justify-between px-4 py-1.5 bg-ludo-surface-dim border-b border-ludo-border">
            <span className="text-xs font-medium text-ludo-white-dim uppercase tracking-wider">
              {language}
            </span>
          </div>
          <SyntaxHighlighter
            style={ludoCodeTheme}
            language={language}
            PreTag="div"
            customStyle={{
              background: "#2f3553",
              margin: 0,
              padding: "1rem",
              fontSize: "0.8125rem",
              lineHeight: "1.6",
            }}
            codeTagProps={{ style: { fontFamily: '"DMMono", monospace' } }}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      );
    }
    return <pre>{children}</pre>;
  },
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    // Inline code only; fenced blocks are handled by `pre` above.
    return (
      <code
        className="px-1.5 py-0.5 rounded bg-ludo-surface-dim border border-ludo-border/60 text-ludo-accent-muted text-[0.8125rem] font-mono wrap-break-word"
        {...props}
      />
    );
  },
};
