import { createFileRoute } from '@tanstack/react-router'
import { useGithubUser } from "@/querries/db";
import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export const Route = createFileRoute("/_user/dashboard")({
  component: Dashboard,
})

function Dashboard() {
  const { data: user, isLoading } = useGithubUser();

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const theme = localStorage.getItem("vite-ui-theme");
    if (theme === "dark") setTheme("dark");
  }, []);

  return (
    <div className='divide-y-2'>
      <SkeletonTheme {
        ...{
          baseColor: theme === "light" ? "#e5e7eb" : "#374151",
          highlightColor: theme === "light" ? "#f3f4f6" : "#1f2937",
        }
      }>
        {
          isLoading ? <Skeleton
            style={{
              marginBottom: "0.3rem",
              width: "200px",
              height: "6rem",
              borderRadius: "0.75rem",
            }}
            count={1}
          /> :
            < div className="flex flex-col p-2 h-24 mb-2 font-[600]">
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

            <Skeleton style={
              {
                display: "flex",
                gap: "1rem",
                height: "10vh",
                minWidth: "350px",
              }
            } count={6} />
          </div>
        </div>
      </SkeletonTheme>
    </div >
  );
}