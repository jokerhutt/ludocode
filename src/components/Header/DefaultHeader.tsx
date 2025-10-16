type DefaultHeaderProps = {
    title: string;
}

export function DefaultHeader({title}: DefaultHeaderProps) {
  return (
    <nav
      className={`col-span-full grid grid-cols-12 border-b-2 border-b-pythonYellow min-h-18 bg-ludoGrayLight`}
    >
      <div className="col-span-full flex items-center justify-center">
        <h1 className="text-lg font-bold text-white">{title}</h1>
      </div>
    </nav>
  );
}
