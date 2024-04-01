import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/studio/')({
  component: () => <div>Hello /studio/!</div>
})