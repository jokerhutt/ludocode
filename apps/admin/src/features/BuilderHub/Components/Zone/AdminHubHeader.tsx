import { HeaderWithBar } from "@ludocode/design-system/zones/header-shell";

export function AdminHubHeader() {
  return (
    <HeaderWithBar device="Both">
      <div className="col-start-2 col-end-12 flex items-center justify-start">
        <h1 className="lg:hidden text-lg font-bold text-white">
          Ludocode Admin Hub
        </h1>
      </div>
    </HeaderWithBar>
  );
}
