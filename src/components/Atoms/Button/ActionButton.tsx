type ActionButtonProps = {
  text: string;
  variant?: "yellow";
  fill?: boolean;
  active?: boolean;
  onClick?: () => void;
};

const variants = {
  yellow: {
    default: "border-ludoYellow/50 text-ludoYellow/50",
    active: "border-ludoYellow text-ludoYellow",
  },
} as const;

export function ActionButton({
  text,
  variant = "yellow",
  fill = false,
  active = false,
  onClick,
}: ActionButtonProps) {

  const style = active ? variants[variant].active : variants[variant].default  

  return (
    <div
      onClick={() => onClick?.()}
      className={`border hover:cursor-pointer py-2 px-4 rounded-xl ${style}`}
    >
      <p className="text-2xl">{text}</p>
    </div>
  );
}
