import type { LanguageFieldDiff } from "../hooks/useLanguageDiffs";

type LanguageDiffOverviewProps = { languageDiffs: LanguageFieldDiff[] };

export function LanguageDiffSection({
  languageDiffs,
}: LanguageDiffOverviewProps) {
  return (
    <>
      {languageDiffs
        .filter((d) => d.hasChanged)
        .map((d) => (
          <div
            key={d.field}
            className={`flex items-center gap-4 text-sm ${d.field == "initialScript" ? "col-span-2" : "col-span-1"} text-ludoAltText`}
          >
            <span className="font-medium text-white">{d.field}</span>

            <span className="text-ludoAltText">:</span>

            <span className="line-through text-red-400">
              {d.oldValue || "∅"}
            </span>

            <span className="text-ludoAltText">→</span>

            <span className="text-green-400">{d.newValue || "∅"}</span>
          </div>
        ))}
    </>
  );
}
