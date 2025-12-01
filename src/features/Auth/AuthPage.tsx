import { Button } from "@/components/ui/button";
import { useGoogleAuthEntry } from "../../Hooks/Queries/Mutations/useGoogleAuthEntry";
import { MainGridWrapper } from "@/components/LudoComponents/Layouts/Grids/MainGridWrapper";
import { MainContentWrapper } from "@/components/LudoComponents/Layouts/Grids/MainContentWrapper";


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
