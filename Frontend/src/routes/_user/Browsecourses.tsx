import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/Browsecourses')({
  component: Browsecourses,
})

function Browsecourses() {
  return (
    <div>
      <h1>Browse Courses</h1>
    </div>
  );
}