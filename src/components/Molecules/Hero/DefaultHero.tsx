import { Button } from "@/components/ui/button";

type DefaultHeroProps = {
  onClick: () => void;
  title: string;
  subtitle: string;
  buttonText: string;
};

export function DefaultHero({
  onClick,
  title,
  subtitle,
  buttonText,
}: DefaultHeroProps) {
  return (
    <div className="pb-2 flex flex-col gap-2 text-white">
      <h1 className="text-2xl">{title}</h1>
      <div className="flex items-center justify-between">
        <p>{subtitle}</p>
        <Button onClick={() => onClick()}>{buttonText}</Button>
      </div>
    </div>
  );
}
