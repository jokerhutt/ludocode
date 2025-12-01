import { cn } from "@/components/utils";

export type ListHeaderProps = {
  title: string;
  onClick?: () => void;
  className?: string;
};

export function ListHeader({ title, className }: ListHeaderProps) {
  return (
    <div
      className={cn(
        `border-b bg-ludoGrayLight rounded-t-lg border-ludoGrayLight w-full`,
        className
      )}
    >
      <p className="text-white text-xl font-bold p-2 text-center">{title}</p>
    </div>
  );
}
