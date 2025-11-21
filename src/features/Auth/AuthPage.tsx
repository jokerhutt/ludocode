import { useGoogleAuthEntry } from "../../Hooks/Queries/Mutations/useGoogleAuthEntry";
import { MainContentWrapper } from "../../Layouts/LayoutWrappers/MainContentWrapper";
import { MainGridWrapper } from "../../Layouts/LayoutWrappers/MainGridWrapper";

type AuthPageProps = {};

export function AuthPage({}: AuthPageProps) {
  const googleLogin = useGoogleAuthEntry();

  return (
    <MainGridWrapper gridRows="ONE">
      <MainContentWrapper>
        <div className="col-span-full flex items-center justify-center h-full">
          <div className="border border-ludoGrayLightShadow p-6 flex justify-center items-center flex-col bg-ludoGrayLight rounded-2xl w-1/3">
            <button
              onClick={() => googleLogin()}
              className="bg-white hover:cursor-pointer font-bold rounded-lg py-1 px-8 text-center"
            >
              SIGN UP WITH GOOGLE
            </button>
          </div>
        </div>
      </MainContentWrapper>
    </MainGridWrapper>
  );
}
