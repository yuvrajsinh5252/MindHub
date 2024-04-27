import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className='bg-background text-foreground'>
      <Navbar />
      <Toaster />
      <Outlet />
    </div>
  ),
})