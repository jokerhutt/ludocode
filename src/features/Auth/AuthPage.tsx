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
        <div className="col-span-full flex items-center justify-center h-full">
          <div className="border border-ludoGrayLightShadow p-6 flex justify-center items-center flex-col bg-ludoGrayLight rounded-2xl lg:w-1/3">
            <Button
              onClick={() => googleLogin()}
              className="font-bold hover:cursor-pointer"
            >
              SIGN UP WITH GOOGLE
            </Button>
          </div>
        </div>
      </MainContentWrapper>
    </MainGridWrapper>
  );
}
