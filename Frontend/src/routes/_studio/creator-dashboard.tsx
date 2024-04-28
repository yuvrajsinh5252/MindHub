import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_studio/creator-dashboard')({
  component: CreatorDashboard,
})

function CreatorDashboard() {
  return (
    <div className='flex gap-2'>
      <div className='flex gap-2 flex-col w-8/12'>
        <div className='w-full flex gap-2'>
          <div className='w-[70%] bg-slate-900 h-96 rounded-md'>
            dkalksjd
          </div>
          <div className='w-[29.5%] bg-slate-900 h-96 rounded-md'>
            Recent Comments: Display recent comments on their courses or videos.
            Unanswered questions: Highlight areas where students may need support.
          </div>
        </div>
        <div className=' w-full flex gap-2'>
          <div className='w-full h-96 rounded-md bg-slate-900'>
            Analytics:

            Key metrics: Views, watch time, engagement rates, subscriber count, earnings (if applicable).
            Visualizations: Charts and graphs showing trends over time.
            Top performing content: Highlight their best videos or courses.
          </div>
        </div>
      </div>
      <div className='w-4/12 rounded-md h-92 bg-slate-900'>

      </div>
    </div >
  )
}