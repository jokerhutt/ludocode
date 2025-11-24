import { Button } from "@/components/ui/button";
import { ComputerDesktopIcon } from "@heroicons/react/24/solid";

type MobileFallbackPageProps = { override: () => void };

export function MobileFallbackPage({ override }: MobileFallbackPageProps) {
  return (
    <div className="w-dvw h-dvh flex flex-col px-8 gap-6 items-center justify-center bg-ludoGrayDark">
      <h1 className="text-center font-bold mb-6 text-2xl text-ludoAltText">
        To continue using Ludocode, switch to a desktop device
      </h1>
      <h1 className="text-center font-bold text-md text-ludoAltText">
        To override this, click below (Will look ugly)
      </h1>
      <Button onClick={() => override()} className="w-1/2">Override</Button>
    </div>
  );
}
