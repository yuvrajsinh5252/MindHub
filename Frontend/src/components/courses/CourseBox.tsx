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
      <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-200 rounded-md p-4 w-[350px]">
        <div className="flex flex-col gap-5">
          <img src={course ? course.courseUrl : "/course.png"} alt="course" className="h-56 w-[330px] rounded-md" />
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold dark:text-white text-gray-800">{course.name}</div>
              <div className="text-sm dark:text-gray-400 text-gray-500">{course.category}</div>
            </div>
            <div>
              <Button>View</Button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}