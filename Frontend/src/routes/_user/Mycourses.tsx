import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/Mycourses')({
  component: Mycourses,
})

function Mycourses() {
  return (
    <div className='bg-white'>
      <h1>My Courses</h1>
    </div>
  );
}