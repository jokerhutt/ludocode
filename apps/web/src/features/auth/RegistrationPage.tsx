import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper.tsx";
import { MainContentWrapper } from "@ludocode/design-system/layouts/grid/main-content-wrapper.tsx";
import { useFirebaseAuthEntry } from "@/queries/mutations/useFirebaseAuthEntry.tsx";
import { EmailAuthForm } from "@/features/auth/components/EmailAuthForm.tsx";
import { ProviderLoginGroup } from "@/features/auth/components/ProviderLoginGroup.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { router } from "@/main.tsx";
import { useFirebaseEmailAuth } from "@/queries/mutations/useFirebaseEmailAuth.tsx";

export function RegistrationPage() {
  const firebaseLogin = useFirebaseAuthEntry();
  const emailAuth = useFirebaseEmailAuth();
  return (
    <MainGridWrapper gridRows="ONE">
      <MainContentWrapper>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col gap-4 w-4/5 lg:w-1/3 items-center justify-center">
            <h1 className="text-center text-3xl lg:text-6xl text-ludo-white">
              Ludocode
            </h1>
            <div className="w-full flex flex-col gap-4 justify-center"></div>
            <div className="w-full flex flex-col gap-6">
              <EmailAuthForm
                mode="REGISTER"
                onSubmit={(email, password) =>
                  emailAuth(email, password, "REGISTER")
                }
              />
              <ProviderLoginGroup onLogin={firebaseLogin} />
              <hr className="w-full" />
            </div>

            <div className="w-full flex flex-col gap-0.5 text-sm text-ludo-white">
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => router.navigate(ludoNavigation.auth.login())}
                  className="hover:cursor-pointer font-bold underline"
                >
                  Sign in here
                </span>{" "}
              </p>
              {/* <p>
                Forgot your password?{" "}
                <span className="font-bold underline">Reset your password</span>
              </p> */}
            </div>
          </div>
        </div>
      </MainContentWrapper>
    </MainGridWrapper>
  );
}
