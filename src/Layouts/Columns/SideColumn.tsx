type SideColumnSize = "thin" | "default" | "wide"

type SideColumnProps = {className?: string};

export function SideColumn({className}: SideColumnProps) {

  const columnSize = {
    thin: "",
    default: "",
    wide: ""
  }

  return (
    <>
      <p>SideColumn</p>
    </>
  );
}