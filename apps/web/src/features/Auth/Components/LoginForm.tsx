import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { Input } from "@ludocode/external/ui/input";

type LoginFormProps = {};

export function LoginForm({}: LoginFormProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <div className="w-full text-ludoAltText flex flex-col gap-2">
          <p className="text-sm">Email</p>
          <Input
            className="bg-ludoGrayLight placeholder:text-ludoGray h-12 border-none text-white"
            placeholder="Your email"
          />
        </div>
        <div className="w-full text-ludoAltText flex flex-col gap-2">
          <p className="text-sm">Password</p>
          <Input
            className="bg-ludoGrayLight placeholder:text-ludoGray h-12 border-none text-white"
            placeholder="Your password"
          />
        </div>
      </div>

      <div className="w-full">
        <LudoButton variant="alt">Sign in</LudoButton>
      </div>
    </div>
  );
}
