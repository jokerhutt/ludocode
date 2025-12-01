import { Button } from "@/components/external/ui/button";
import { useGoogleAuthEntry } from "@/hooks/Queries/Mutations/useGoogleAuthEntry";
import { MainGridWrapper } from "@/components/design-system/layouts/grid/main-grid-wrapper.tsx";
import { MainContentWrapper } from "@/components/design-system/layouts/grid/main-content-wrapper.tsx";

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
              This is a project that i made as a showcase project for Mimo.{" "}
              <br /> <br /> If you are from Mimo and do not wish to use Google,
              I have sent a demo authentication link in my email. I hope you
              enjoy! 🤞
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
