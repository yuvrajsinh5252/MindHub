import ProtectedRoute from '@/components/ProtectedRoute'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_studio')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div>
      <ProtectedRoute>
        <h1>Layout</h1>
        <Outlet />
      </ProtectedRoute>
    </div>
  )
}