type ClickableOptionProps = {
  content: string;
  isSelected: boolean;
  handleClick: () => void;
};

export function ClickableOption({
  content,
  isSelected,
  handleClick,
}: ClickableOptionProps) {
  const allowedStyle = `text-white border-ludoGrayLight/50`;
  const disabledStyle = `text-white/50 border-ludoGrayLight/50`;
  const displayStyle = isSelected ? disabledStyle : allowedStyle;

  return (
    <div
      onClick={() => handleClick()}
      className={`py-2 code hover:cursor-pointer ${displayStyle} px-4 border-3 border-ludoGrayLight rounded-xl`}
    >
      <p className="text-md">{content}</p>
    </div>
  );
}
