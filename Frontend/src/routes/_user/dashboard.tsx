import { createFileRoute } from '@tanstack/react-router'
import { Skeleton } from "@/components/ui/skeleton";
import { useGithubUser } from "@/querries/db";

export const Route = createFileRoute("/_user/dashboard")({
  component: Dashboard,
})

function Dashboard() {
  const { data: user, isLoading } = useGithubUser();

  return (
    <div className='divide-y-2'>
      {
        isLoading ? <Skeleton className="h-24 mb-2 w-[250px] rounded-xl" /> :
          <div className="flex flex-col p-2 h-24 mb-2 font-[600]">
            <div className="dark:text-white text-gray-500">
              Welcome back
            </div>
            <div className="text-3xl font-semibold space-y-3">
              {user?.data.login}
            </div>
          </div>
      }
      <div>
        <div className="text-2xl font-semibold p-2">
          Role
        </div>
        <div className="flex flex-col gap-5 p-2">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <Skeleton className="h-[125px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}