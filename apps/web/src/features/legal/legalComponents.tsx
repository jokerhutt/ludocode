import type { MDXComponents } from "mdx/types";

export const legalComponents: MDXComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-2xl font-bold text-ludo-white-bright tracking-tight mb-2"
      {...props}
    />
  ),

  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-lg font-semibold text-ludo-white-bright mt-10 mb-3 pb-2 border-b border-white/10"
      {...props}
    />
  ),

  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-sm font-semibold uppercase tracking-wide text-ludo-white-dim mt-7 mb-2"
      {...props}
    />
  ),

  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-sm leading-relaxed text-ludo-white-bright/80 mb-4"
      {...props}
    />
  ),

  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc list-outside ml-5 mb-5 space-y-1.5 text-sm text-ludo-white-bright/80"
      {...props}
    />
  ),

  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-outside ml-5 mb-5 space-y-1.5 text-sm text-ludo-white-bright/80"
      {...props}
    />
  ),

  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),

  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-ludo-white-bright" {...props} />
  ),

  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="text-ludo-white-dim not-italic text-xs" {...props} />
  ),

  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-ludo-accent-muted underline underline-offset-2 hover:text-ludo-white-bright transition-colors"
      {...props}
    />
  ),

  hr: () => <hr className="border-white/10 my-8" />,
};
