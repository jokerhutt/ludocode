import { ludoNavigation } from "../../routes/ludoNavigation";
import { router } from "../../routes/router";

type NavIcon = {
  name: string;
  icon?: string;
  onClick?: () => void;
};

export function GlobalFooter() {
  const icons: NavIcon[] = [
    {
      name: "Courses",
      onClick: () => router.navigate(ludoNavigation.courseRoot()),
    },
    {
      name: "Learn",
      onClick: () => router.navigate(ludoNavigation.moduleRedirect()),
    },
    {
      name: "Practice",
      onClick: () => router.navigate(ludoNavigation.practice()),
    },
    {
      name: "Profile",
      onClick: () => router.navigate(ludoNavigation.me())
    },
  ];

  return (
    <footer
      className={`col-span-full grid grid-cols-12 min-h-18 border-t-2 border-t-pythonYellow bg-ludoGrayLight`}
    >
      <div className="col-start-2 col-end-12 flex justify-between items-center">
        {icons.map((icon) => (
          <div>
            <p className="text-white" onClick={() => !!icon.onClick && icon.onClick()}>{icon.name}</p>
          </div>
        ))}
      </div>
    </footer>
  );
}
