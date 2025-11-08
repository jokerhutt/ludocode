import { HeroIcon } from "../Icons/HeroIcon";

type ExitButtonProps = { onClick?: () => void };

export function ExitButton({ onClick }: ExitButtonProps) {
  return (
    <div
      onClick={() => onClick?.()}
      className="p-2 rounded-full hover:cursor-pointer hover:bg-ludoGrayDark/50"
    >
      <HeroIcon iconName="XMarkIcon" className="text-white h-8 " />
    </div>
  );
}
