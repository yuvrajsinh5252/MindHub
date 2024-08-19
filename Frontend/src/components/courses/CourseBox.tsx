import { Link } from "@tanstack/react-router";
import { buttonVariants } from "../ui/button";

interface CourseProps {
  course: {
    name: string;
    id: number;
    courseUrl: string;
    file_id: number;
    description: string;
    category: string;
  };
  index: number;
}

export default function CourseBox({ course, index }: CourseProps) {
  return (
    <div key={index} className="mb-4">
      <div className="hover:shadow-xl bg-card transition-shadow duration-200 rounded-md w-[350px]">
        <div className="flex flex-col">
          <img
            src={course.courseUrl || "/course.png"}
            alt="course"
            className="rounded-t-md aspect-w-16 aspect-h-9 h-[200px]"
          />
          <div className="flex items-center justify-between p-4 bg-card rounded-l-md rounded-r-md">
            <div>
              <div className="text-lg font-semibold">{course.name}</div>
              <div className="text-sm text-gray-400 mb-2">{course.category}</div>
            </div>
            <Link
              to={`/browsecourse/${course.id}`}
              className={buttonVariants({
                variant: "secondary",
                size: "sm",
              })}
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
