import { useFileViewer } from '@/querries/db'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_studio/courses/$videoId')({
  component: Video,
})

function Video() {
  const { videoId } = Route.useParams()
  const { data, isLoading } = useFileViewer({ variables: { id: videoId } })

  return (
    <div>
      {
        isLoading ? (
          <div>
            Loading...
          </div>
        ) : (
          <div>
            <video
              width={1920}
              height={1080}
              src={data.data[0].url} controls></video>
          </div>
        )}
    </div >
  )
}