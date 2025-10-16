import { router } from "../../routes/router";
import { LessonFooter } from "./LessonFooter";

type NavIcon = {
  name: string;
  icon?: string;
  onClick?: () => void;
};

export function GlobalFooter() {
  const icons: NavIcon[] = [
    {
      name: "Courses",
      onClick: () => router.navigate({ to: "/" }),
    },
    {
      name: "Learn",
      onClick: () => router.navigate({ to: "/modules" }),
    },
    {
      name: "Practice",
      onClick: () => router.navigate({to: "/practice"}),
    },
    {
      name: "Profile",
      onClick: () => router.navigate({to: "/profile"})
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
