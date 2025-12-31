import { Button } from "@ludocode/external/ui/button";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { useRouter } from "@tanstack/react-router";

type BuilderCourseCardProps = { title: string; id: string };

export function BuilderCourseCard({ title, id }: BuilderCourseCardProps) {
  const router = useRouter();
  return (
    <div className="w-full text-white rounded-2xl p-6 flex-col flex lg:flex-row lg:items-center lg:justify-between border-ludoGrayLight border-2">
      <div className="flex flex-col gap-2">
        <h2>{title}</h2>
        <p>{id}</p>
      </div>
      <Button
        className="lg:mt-0 mt-3"
        onClick={() => router.navigate(ludoNavigation.builder.toBuilder(id))}
      >
        Edit Course
      </Button>
    </div>
  );
}
