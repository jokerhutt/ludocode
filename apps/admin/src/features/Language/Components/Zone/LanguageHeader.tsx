import { LudoHeader } from "@ludocode/design-system/zones/ludo-header";

type LanguageHeaderProps = {};

export function LanguageHeader({}: LanguageHeaderProps) {
  return (
    <LudoHeader>
      <LudoHeader.Shell device="Both">
        <div className="col-start-3 col-end-11 flex items-center justify-between">
          <h1 className="text-lg font-bold text-ludo-white">Language Editor</h1>
        </div>
        <LudoHeader.Bar />
      </LudoHeader.Shell>
    </LudoHeader>
  );
}
