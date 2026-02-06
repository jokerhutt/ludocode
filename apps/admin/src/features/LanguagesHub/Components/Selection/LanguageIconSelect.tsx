import {
  Icons,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon";

type LanguageIconSelectProps = {
  iconName: string;
  setIconName: (value: IconName | "") => void;
};

export function LanguageIconSelect({
  iconName,
  setIconName,
}: LanguageIconSelectProps) {
  return (
    <select
      className="w-full bg-transparent border border-ludo-accent-muted rounded px-2 py-1 text-white"
      value={iconName}
      onChange={(e) => setIconName(e.target.value as IconName)}
    >
      <option value="">Select icon</option>
      {(Object.keys(Icons) as IconName[]).map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
}
