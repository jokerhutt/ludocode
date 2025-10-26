type ListRowProps = {
  hover?: boolean;
  content: string;
  active?: boolean;
  onClick?: () => void;
};

export function ListRow({hover, content, active, onClick}: ListRowProps) {

  const hoverStyle = hover ? "hover:bg-ludoGrayLight/20" : ""
  const activeStyle = active ? "bg-white/30" : ""

  return (
    <div
      onClick={() => onClick?.()}
      className={`text-white ${hoverStyle} ${activeStyle} hover:cursor-pointer w-full px-2 py-4 text-lg border-b border-b-ludoGrayLight`}
    >
      <p>
        {content}
      </p>
    </div>
  );
}
