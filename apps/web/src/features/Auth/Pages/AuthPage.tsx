import { Button } from "@ludocode/external/ui/button";
import { useGoogleAuthEntry } from "@/hooks/Queries/Mutations/useGoogleAuthEntry.tsx";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper";
import { MainContentWrapper } from "@ludocode/design-system/layouts/grid/main-content-wrapper";

type AuthPageProps = {};

export function AuthPage({}: AuthPageProps) {
  const googleLogin = useGoogleAuthEntry();

  return (
    <MainGridWrapper gridRows="ONE">
      <MainContentWrapper>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col gap-12 w-4/5 lg:w-1/2 items-center justify-center">
            <h1 className="text-center text-3xl lg:text-6xl text-ludoAltText">
              Welcome to Ludocode
            </h1>

            <p className="text-ludoAltText text-center text-xl">
              This is a work in progress code learning platform.
              <br /> The core features are here, try it out!
            </p>

            <div className="border border-ludoGrayLightShadow p-6 flex justify-center items-center flex-col w-full">
              <Button
                onClick={() => googleLogin()}
                className="font-bold h-16 px-6 text-2xl hover:cursor-pointer"
              >
                Sign in with Google
              </Button>
            </div>
          </div>
        </div>
      </MainContentWrapper>
    </MainGridWrapper>
  );
}
