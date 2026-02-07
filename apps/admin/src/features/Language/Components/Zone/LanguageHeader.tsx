import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { HeaderWithBar } from "@ludocode/design-system/zones/header-shell";

type LanguageHeaderProps = {};

export function LanguageHeader({}: LanguageHeaderProps) {
  return (
    <HeaderWithBar device="Both">
      <div className="col-start-3 col-end-11 flex items-center justify-between">
        <h1 className="text-lg font-bold text-ludoAltText">Language Editor</h1>
      </div>
    </HeaderWithBar>
  );
}
