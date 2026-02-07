import {
  CustomIcon,
  Icons,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon";
import {
  LudoSelect,
  LudoSelectItem,
} from "@ludocode/design-system/primitives/select";

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
  return (
    <LudoSelect
      value={currentValue}
      setValue={(v) => setValue(v as IconName)}
      title="Icon"
      error={errors}
    >
      {(Object.keys(Icons) as IconName[]).map((name) => (
        <LudoSelectItem key={name} value={name}>
          <span className="flex items-center gap-2">
            <CustomIcon iconName={name} className="h-4 w-4" color="white" />
            <span>{name}</span>
          </span>
        </LudoSelectItem>
      ))}
    </LudoSelect>
  );
}
