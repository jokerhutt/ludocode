type ActionButtonProps = {
  text: string;
  variant?: "yellow" | "default";
  fill?: boolean;
  orientation?: "start" | "center" | "end";
  active?: boolean;
  onClick?: () => void;
};

const variants = {
  yellow: {
    default: "border-ludoYellow/50 text-ludoYellow/50",
    active: "border-ludoYellow text-ludoYellow",
  },
  default: {
    default: "bg-ludoLightPurple/50 text-black/50",
    active: "bg-ludoLightPurple text-black font-bold",
  },
} as const;

export function ActionButton({
  text,
  variant = "default",
  fill = false,
  active = false,
  orientation = "start",
  onClick,
}: ActionButtonProps) {
  const style = active ? variants[variant].active : variants[variant].default;
  const orientationStyle = {
    start: "text-start",
    center: "text-center",
    end: "text-end",
  };
  const shadowStyle = active
    ? `shadow-ludoDarkPurpleShadow `
    : `shadow-ludoDarkPurpleShadow/50`;

  return (
    <div
      onClick={() => onClick?.()}
      className={` ${
        active ? "hover:cursor-pointer" : "hover:cursor-not-allowed"
      } py-1.5 ${shadowStyle} px-4 rounded-xl active:shadow-none active:translate-y-1.5 ${style}`}
    >
      <p className={`text-2xl ${orientationStyle[orientation]}`}>{text}</p>
    </div>
  );
}
