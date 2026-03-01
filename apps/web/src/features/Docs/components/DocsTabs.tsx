import { useState, type ReactNode } from "react";

type Tab = {
  label: string;
  content: ReactNode;
};

type DocsTabsProps = {
  tabs: Tab[];
};

export function DocsTabs({ tabs }: DocsTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="my-6 rounded-lg border border-ludo-border overflow-hidden">
      {/* Tab Headers */}
      <div className="flex overflow-x-auto scrollbar-none border-b border-ludo-border bg-ludo-surface/40">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveIndex(index)}
            className={`
              px-4 sm:px-5 py-2.5 text-sm font-medium transition-all duration-200 relative whitespace-nowrap
              ${
                activeIndex === index
                  ? "text-ludo-accent-muted"
                  : "text-ludo-text-dim hover:text-ludo-text-hover"
              }
            `}
          >
            {tab.label}
            {activeIndex === index && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ludo-accent" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-5 bg-ludo-background/50">
        {tabs[activeIndex].content}
      </div>
    </div>
  );
}
