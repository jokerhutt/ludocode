import { CommonHeader } from "./CommonHeader";

type DefaultHeaderProps = {
  title: string;
};

export function DefaultHeader({ title }: DefaultHeaderProps) {
  return (
    <CommonHeader>
      <div className="col-span-full flex items-center justify-center">
        <h1 className="text-lg font-bold text-white">{title}</h1>
      </div>
    </CommonHeader>
  );
}
