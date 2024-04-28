import ProtectedRoute from '@/components/ProtectedRoute'
import TopBar from '@/components/studio/Topbar'
import Sidebar from '@/components/studio/sidebar'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import CourseProvider from '@/components/courses/CourseContext';

export const Route = createFileRoute('/_studio')({
  component: LayoutComponent,
})

function LayoutComponent() {
  const [open, setOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="bg-accent text-foreground w-full h-screen flex items-end justify-end overflow-hidden">
        <Sidebar open={open} />
        <div className="h-full w-full px-2">
          <TopBar />

          {/* page content starts */}
          <div className="no-scrollbar bg-background rounded-xl w-full p-2 h-[calc(100%-4rem)] overflow-y-scroll scroll-smooth relative">
            <button
              onClick={() => {
                setOpen(!open);
              }}
              className="absolute top-[50%] max-sm:left-[-0.5%] left-0 rounded-e-md"
            >
              {
                open ? <ChevronRight className='w-5 h-16' /> : <ChevronLeft className='w-5 h-16' />
              }
            </button>
            <CourseProvider>
              <Outlet />
            </CourseProvider>
          </div>
          {/* page content ends */}
          t</div>
      </div>
    </ProtectedRoute>
  )
}