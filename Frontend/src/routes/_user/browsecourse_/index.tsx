import CourseBox from '@/components/courses/CourseBox';
import { useViewerCourse } from '@/querries/db';
import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react';

export const Route = createFileRoute('/_user/browsecourse/')({
  component: Browsecourses,
})

function Browsecourses() {
  const { data, isLoading } = useViewerCourse();

  return (
    <div>
      {
        isLoading ? (
          <div className='flex justify-center items-center h-96'>
            <Loader2 className='w-10 h-10 animate-spin' />
          </div>
        ) : (
          <div className='flex gap-5'>
            {data?.data.map((course: any, index: number) => (
              <CourseBox key={course.id} course={course} index={index} />
            ))}
          </div>
        )
      }
    </div>
  );
}