import type { CourseType } from "./HomePage";

type CourseCardProps = {
  course: CourseType;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="flex items-center w-full h-60 rounded-4xl bg-ludoGrayLight justify-center">
      <div className="w-full flex items-center justify-center">
        <h2 className="text-white text-3xl font-bold">{course.name}</h2>
      </div>
      <div className="h-full w-1/6 rounded-r-4xl overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={course.courseBg}
        />
      </div>
    </div>
  );
}
