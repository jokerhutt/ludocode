import { useOnboardingContext } from "../OnboardingContext";

export function CourseChoiceStep() {
  const { content, hook } = useOnboardingContext();
  const { selectedCourse, chooseCourse } = hook;

  const isSelected = (courseId: string) => courseId == selectedCourse;

  return (
    <>
      <h1 className="text-2xl text-center font-bold text-white">
        What language would you like to start with?
      </h1>
      <div className="grid grid-cols-3 py-6 gap-6">
        {content.courseContent.map((cContent) => (
          <div
            onClick={() => chooseCourse(cContent.courseId)}
            className={`p-6 hover:cursor-pointer ${
              isSelected(cContent.courseId)
                ? "border-2 border-ludoLightPurple"
                : ""
            } min-h-40 flex flex-col items-center justify-center rounded-2xl bg-ludoGrayLight`}
          >
            <h1 className="text-white text-xl font-bold">{cContent.title}</h1>
          </div>
        ))}
      </div>
    </>
  );
}
