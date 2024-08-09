import { createFileRoute } from '@tanstack/react-router'
import { useFileViewer } from '@/querries/db'
import { Loader2Icon } from 'lucide-react'

export const Route = createFileRoute('/_user/browsecourse/$courseId')({
  component: Browsecourse,
})

function Browsecourse() {
  const { courseId } = Route.useParams()
  const { data, isLoading, isError } = useFileViewer({ variables: { id: courseId } })

  if (isLoading) {
    return (
      <div className='h-full flex justify-center items-center'>
        <Loader2Icon size={50} className='animate-spin' />
      </div>
    )
  }

  if (isError) {
    return (
      <div className='h-full flex justify-center items-center'>
        <p>Failed to load video.</p>
      </div>
    )
  }

  return (
    <div className='h-full flex justify-center items-center'>
      <video
        src={data.data[0].url}
        width={1080}
        height={1080}
        className="aspect-w-16 aspect-h-9 rounded-lg"
        controls
      />
    </div>
  )
}