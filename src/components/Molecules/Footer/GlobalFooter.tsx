import { navIcons } from "../../../constants/navIcons.ts";


export function GlobalFooter() {

  const icons = navIcons;

  return (
    <footer
      className={`lg:hidden col-span-full grid grid-cols-12 min-h-18 border-t-2 border-t-pythonYellow bg-ludoGrayLight`}
    >
      <div className="col-start-2 col-end-12 flex justify-between items-center">
        {icons.map((icon) => (
          <div key={icon.name}>
            <p className="text-white" onClick={() => !!icon.onClick && icon.onClick()}>{icon.name}</p>
          </div>
        ))}
      </div>
    </footer>
  );
}
