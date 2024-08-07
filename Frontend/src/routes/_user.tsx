import ProtectedRoute from '@/components/ProtectedRoute'
import TopBar from '@/components/Topbar'
import Sidebar from '@/components/sidebar'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_user')({
  component: LayoutComponent,
})

function LayoutComponent() {
  const [open, setOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="w-full h-screen bg-accent dark:bg-background text-foreground flex items-end justify-end overflow-hidden">
        <Sidebar open={open} />
        <div className="h-full w-full px-2">
          <TopBar />

          {/* page content starts */}
          <div className="no-scrollbar bg-background dark:bg-secondary rounded-xl w-full p-4 h-[calc(100%-4rem)] overflow-y-scroll scroll-smooth relative">
            <button
              onClick={() => {
                setOpen(!open);
              }}
              className="absolute top-[50%] max-sm:left-[-0.5%] left-0 rounded-e-md bg-zinc-500 text-white"
            >
              <ChevronRight className='w-5 h-16' />
            </button>
            <Outlet />
          </div>
          {/* page content ends */}
        </div>
      </div>
    </ProtectedRoute>
  )
}