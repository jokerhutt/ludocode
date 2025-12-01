import { cn } from "@/components/utils";

type HeaderTabProps = {
  text: string;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
};

export function HeaderTab({
  text,
  onClick,
  isActive = false,
  className,
}: HeaderTabProps) {
  const activeStyle = isActive ? "bg-ludoGrayLight/70" : "";

  return (
    <div
      onClick={() => onClick()}
      className={cn(
        "flex items-center bg-ludoGrayDark/60 justify-center",
        activeStyle,
        className
      )}
    >
      <p>{text}</p>
    </div>
  );
}
