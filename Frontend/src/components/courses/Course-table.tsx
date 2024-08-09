import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCreatorCourse } from "@/querries/db";
import { Loader2, PencilIcon, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export default function CourseTable({
  user,
  userLoading,
}: { user: any, userLoading: any }) {
  const { data: courseData, isLoading } = useCreatorCourse({ variables: { id: user?.data.id }, enabled: !!user?.data.id });

  if (isLoading || userLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }
  return (
    <div>
      <Table>
        <TableCaption>A list of your courses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[1200px]">video</TableHead>
            <TableHead>index</TableHead>
            <TableHead>actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courseData?.data?.map((course: any, index: number) => (
            <TableRow key={course.file_id}>
              <TableCell className="flex items-center justify-start gap-6">
                <img
                  src={course.courseUrl}
                  className="aspect-w-16 aspect-h-9 w-40 rounded-md"
                />
                <div className="flex flex-col justify-start">
                  <div className="title text-xl font-bold">{course.name}</div>
                  <div className="description">{course.description}</div>
                </div>
              </TableCell>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Button size={"icon"} className="mr-2 w-20" variant={"outline"}>
                  <PencilIcon />
                </Button>
                <Button size={"icon"} className="ml-2 w-16" variant={"destructive"}>
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}