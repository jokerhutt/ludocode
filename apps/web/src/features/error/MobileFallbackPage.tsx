import { ludoNavigation } from "@/constants/ludoNavigation";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { Button } from "@ludocode/external/ui/button.tsx";
import { useRouter } from "@tanstack/react-router";

export function MobileFallbackPage() {
  const router = useRouter();
  return (
    <div className="w-dvw h-dvh flex flex-col px-8 gap-2 items-center justify-center bg-ludo-background">
      <h1 className="text-center font-bold mb-6 text-2xl text-ludo-white">
        To continue using this feature, switch to a desktop device
      </h1>
      <LudoButton variant="alt" onClick={() => router.navigate(ludoNavigation.hub.community.toCommunityHub())} className="mt-4">
        Alright, take me back!
      </LudoButton>
    </div>
  );
}
