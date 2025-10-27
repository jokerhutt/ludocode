type ListHeaderProps = {
  show: boolean;
  title?: string;
  rounding: string;
};

export function ListHeader({ show, rounding, title }: ListHeaderProps) {
  if (!show) return null;
  return (
    <div
      className={`border-b ${rounding} bg-ludoGrayLight border-ludoGrayLight w-full`}
    >
      <p className="text-white text-xl font-bold p-2 text-center">{title}</p>
    </div>
  );
}
