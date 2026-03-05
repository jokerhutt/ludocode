import {
  CustomIcon,
  IconRegistry,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import {
  LudoSelect,
  LudoSelectItem,
} from "@ludocode/design-system/primitives/select.tsx";

type LanguageIconSelectProps = {
  currentValue: string;
  setValue: (v: IconName) => void;
  errors?: string;
};

export function LanguageIconSelect({
  currentValue,
  setValue,
  errors,
}: LanguageIconSelectProps) {
  const languageIcons = Object.entries(IconRegistry)
    .filter(([_, def]) => def.category === "language")
    .map(([name]) => name as IconName);

  return (
    <LudoSelect
      value={currentValue}
      setValue={(v) => setValue(v as IconName)}
      title="Icon"
      error={errors}
    >
      {languageIcons.map((name) => (
        <LudoSelectItem key={name} value={name}>
          <span className="flex items-center gap-2">
            <CustomIcon iconName={name} color="white" className="h-4 w-4" />
            <span>{name}</span>
          </span>
        </LudoSelectItem>
      ))}
    </LudoSelect>
  );
}
