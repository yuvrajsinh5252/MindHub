import CourseBox from '@/components/courses/CourseBox';
import { useViewerCourse } from '@/querries/db';
import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react';

export const Route = createFileRoute('/_user/Browsecourses')({
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
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {data?.data.map((course: any, index: number) => (
              <CourseBox key={course.id} course={course} index={index} />
            ))}
          </div>
        )
      }
    </div>
  );
}