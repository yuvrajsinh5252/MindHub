import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

interface CourseProps {
  course: {
    name: string;
    id: number;
    courseUrl: string;
    file_id: number;
    description: string;
    category: string;
  }
  index: number;
}

export default function CourseBox({ course, index }: CourseProps) {
  return (
    <div key={index}>
      <div className="hover:shadow-xl bg-white dark:bg-zinc-800 transition-shadow duration-200 rounded-md w-[350px]">
        <div className="flex flex-col">
          <img src={course ? course.courseUrl : "/course.png"} alt="course" className="rounded-t-md aspect-w-16 aspect-h-9 h-[200px]" />
          <div className="flex items-center justify-between p-2 border-border border-2 rounded-b-md">
            <div>
              <div className="text-lg font-semibold">{course.name}</div>
              <div className="text-sm">{course.category}</div>
            </div>
            <div>
              <Button onClick={() => {
                Link({
                  // to: `/video${course.file_id}`,
                  replace: false
                })
              }}>View</Button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}