import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_studio/courses/$videoId')({
  component: () => <div>Hello /_studio/courses/$videoId!</div>
})