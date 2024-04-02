import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_studio/')({
  component: () => <div>Hello /studio/!</div>
})