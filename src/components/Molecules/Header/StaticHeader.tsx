import type { DeviceType } from "./HeaderShell";
import { HeaderWithBar } from "./HeaderWithBar";

type StaticHeaderProps = {
  title: string;
  device?: DeviceType;
};

export function StaticHeader({ title, device = "Mobile" }: StaticHeaderProps) {
  return (
    <HeaderWithBar device={device}>
      <div className="col-span-full flex items-center justify-center">
        <h1 className="text-lg font-bold text-white">{title}</h1>
      </div>
    </HeaderWithBar>
  );
}
