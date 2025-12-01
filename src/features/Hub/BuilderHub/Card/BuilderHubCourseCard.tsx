import { Button } from "@/components/ui/button";
import { ludoNavigation } from "@/routes/ludoNavigation";
import { router } from "@/routes/router";

type BuilderHubCourseCardProps = { title: string; id: string };

export function BuilderHubCourseCard({ title, id }: BuilderHubCourseCardProps) {
  return (
    <div className="w-full text-white rounded-2xl p-6 flex-col flex lg:flex-row lg:items-center lg:justify-between border-ludoGrayLight border-2">
      <div className="flex flex-col gap-2">
        <h2>{title}</h2>
        <p>{id}</p>
      </div>
      <Button
        className="lg:mt-0 mt-3"
        onClick={() => router.navigate(ludoNavigation.build.toBuilder(id))}
      >
        Edit Course
      </Button>
    </div>
  );
}
