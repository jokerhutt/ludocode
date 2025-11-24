import { Button } from "@/components/ui/button";
import { router } from "@/routes/router";

export function MobileFallbackPage() {
  return (
    <div className="w-dvw h-dvh flex flex-col px-8 gap-2 items-center justify-center bg-ludoGrayDark">
      <h1 className="text-center font-bold mb-6 text-2xl text-ludoAltText">
        To continue using this feature, switch to a desktop device
      </h1>
      <Button onClick={() => router.history.go(-1)} className="mt-4">
        Alright, take me back!
      </Button>
    </div>
  );
}
