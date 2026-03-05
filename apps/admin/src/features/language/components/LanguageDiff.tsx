import type { LanguageFieldDiff } from "../hooks/useLanguageDiffs.tsx";

type LanguageDiffOverviewProps = { languageDiffs: LanguageFieldDiff[] };

export function LanguageDiff({
  languageDiffs,
}: LanguageDiffOverviewProps) {
  return (
    <>
      {languageDiffs
        .filter((d) => d.hasChanged)
        .map((d) => (
          <div
            key={d.field}
            className={`flex items-center gap-4 text-sm ${d.field == "initialScript" ? "col-span-2" : "col-span-1"} text-ludo-white`}
          >
            <span className="font-medium text-ludo-white-bright">
              {d.field}
            </span>

            <span className="text-ludo-white">:</span>

            <span className="line-through text-red-400">
              {d.oldValue || "∅"}
            </span>

            <span className="text-ludo-white">→</span>

            <span className="text-green-400">{d.newValue || "∅"}</span>
          </div>
        ))}
    </>
  );
}
