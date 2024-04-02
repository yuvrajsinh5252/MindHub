import ProtectedRoute from '@/components/ProtectedRoute'
import TopBar from '@/components/Topbar'
import Sidebar from '@/components/sidebar'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <ProtectedRoute>
      <div className="w-full h-screen bg-neutral-900 flex items-end justify-end overflow-hidden">
        <Sidebar />
        <div className="h-full w-full px-2">
          <TopBar />

          {/* page content starts */}
          <div className="bg-white no-scrollbar dark:bg-black dark:text-white rounded-xl p-2 h-[calc(100%-4rem)] overflow-y-scroll scroll-smooth">
            <Outlet />
          </div>
          {/* page content ends */}
        </div>
      </div>
    </ProtectedRoute>
  )
}