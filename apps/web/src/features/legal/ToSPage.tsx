import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import terms from "@/legal/terms.md?raw";

export function ToSPage() {
  return (
    <div className="max-w-3xl mx-auto py-6 px-6">
      <div className="border-white/10 rounded-2xl p-10">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-ludoAltText mb-8">
                {children}
              </h1>
            ),

            h2: ({ children }) => (
              <h2 className="text-lg font-semibold text-ludoAltText mt-12 mb-4 border-b border-white/10 pb-2">
                {children}
              </h2>
            ),

            h3: ({ children }) => (
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60 mt-8 mb-3">
                {children}
              </h3>
            ),

            p: ({ children }) => (
              <p className="text-sm leading-relaxed text-white/80 mb-5">
                {children}
              </p>
            ),

            ul: ({ children }) => (
              <ul className="mb-6 space-y-2">{children}</ul>
            ),

            li: ({ children }) => (
              <li className="text-sm text-white/80 list-disc ml-5">
                {children}
              </li>
            ),

            a: ({ children, href }) => (
              <a
                href={href}
                className="text-ludo-accent underline underline-offset-2 hover:opacity-80 transition"
              >
                {children}
              </a>
            ),

            hr: () => <div className="my-10 border-t border-white/10" />,
          }}
        >
          {terms}
        </ReactMarkdown>
      </div>
    </div>
  );
}
