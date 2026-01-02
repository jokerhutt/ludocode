import { Button } from "@ludocode/external/ui/button";
import { type FeatureMeta } from "@ludocode/types/FeatureFlags/FeatureFlags";
import { useRouter } from "@tanstack/react-router";

type FeatureDisabledPageProps = { meta: FeatureMeta };

export function FeatureDisabledPage({ meta }: FeatureDisabledPageProps) {
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col px-8 gap-2 items-center justify-center bg-ludoGrayDark">
      <h1 className="text-center font-bold mb-6 text-2xl text-ludoAltText">
        {meta.description}
      </h1>
      <h1 className="text-center font-bold mb-6 text-2xl text-ludoAltText">
        To enable it: <br /> Set {meta.env} to true in your environment
        variables, and fill in the required fields
      </h1>

      <Button
        onClick={() => router.history.go(-1)}
        className="mt-4 text-2xl p-8"
      >
        Alright, take me back!
      </Button>
    </div>
  );
}
