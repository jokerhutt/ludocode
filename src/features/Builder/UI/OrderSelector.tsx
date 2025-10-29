type OrderSelectorProps = {
  index: number;
  count: number;
  onChange: (newIndex: number) => void;
  className?: string;
};

export function OrderSelector({
  index,
  count,
  onChange,
  className,
}: OrderSelectorProps) {
  return (
    <select
      className={className}
      value={String(index)}
      onChange={(e) => onChange(Number(e.target.value))}
      onClick={(e) => e.stopPropagation()}
      aria-label="Reorder"
    >
      {Array.from({ length: count }).map((_, i) => (
        <option key={i} value={String(i)}>
          # {i}
        </option>
      ))}
    </select>
  );
}
