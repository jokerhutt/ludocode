import { CommonFooter } from "../../components/Footer/CommonFooter";
import { CommonHeader } from "../../components/Header/CommonHeader";

type CourseType = {
  name: string;
  description: string;
  imgSrc: string;
};

export function HomePage() {
  const courses: CourseType[] = [
    {
      name: "JavaScript",
      description: "something",
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/500px-JavaScript-logo.png",
    },
    {
      name: "C#",
      description: "something",
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/b/bd/Logo_C_sharp.svg",
    },
    {
      name: "Java",
      description: "something",
      imgSrc: "https://img.icons8.com/color/512/java-coffee-cup-logo--v2.png",
    },
    {
      name: "Typescript",
      description: "something",
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png",
    },
  ];

  return (
    <div className="grid grid-cols-12 grid-rows-[auto_1fr_auto] min-h-screen">
      <CommonHeader>
        <div></div>
      </CommonHeader>

      <div className="grid col-span-full grid-cols-12">
        <div className="col-span-1 lg:col-span-2" />

        <div className="col-span-10 lg:col-span-8 flex flex-col gap-8 py-8 items-stretch justify-center h-full min-w-0">
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {courses.map((course) => (
              <div className="flex flex-col items-center w-full min-h-60 rounded-4xl bg-ludoGrayLight justify-center">
                <h2 className="text-white text-xl">{course.name}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2" />
      </div>
    </div>
  );
}
