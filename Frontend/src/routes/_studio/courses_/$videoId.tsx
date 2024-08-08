import { useFileViewer } from '@/querries/db'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2Icon } from 'lucide-react'

export const Route = createFileRoute('/_studio/courses/$videoId')({
  component: Video,
})

function Video() {
  const { videoId } = Route.useParams()
  const { data, isLoading } = useFileViewer({ variables: { id: videoId } })

  console.log(data);

  return (
    <div className='h-full flex justify-center max-sm:items-start items-center'>
      {
        isLoading ? (
          <div>
            <Loader2Icon size={50} className='animate-spin' />
          </div>
        ) : (
          <div className=''>
            <video
              src={data.data[0].url}
              width={1080} height={1080}
              className="aspect-w-16 aspect-h-9 rounded-lg"
              controls
            >
            </video>
          </div>
        )}
    </div >
  )
}