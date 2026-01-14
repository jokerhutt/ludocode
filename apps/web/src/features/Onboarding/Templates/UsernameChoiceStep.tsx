import { AuthInputField } from "@/features/Auth/Components/Input/AuthInputField";
import { useOnboardingContext } from "../Context/OnboardingContext";

export function UsernameChoiceStep() {
  const { hook } = useOnboardingContext();
  const { selectedUsername, setUsername } = hook;

  return (
    <>
      <h1 className="text-2xl text-center font-bold text-white">
        What would you like to be called?
      </h1>
      <div className="grid lg:grid-cols-2s py-6 gap-6">
        <AuthInputField
          value={selectedUsername}
          setValue={setUsername}
          title="Choose your username"
        />
      </div>
    </>
  );
}
