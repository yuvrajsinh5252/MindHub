import { useQuery } from "@tanstack/react-query";
import { getRole, getUserData } from "../querries/db";
import { Skeleton } from "src/components/ui/skeleton";
import Sidebar from "src/components/sidebar";
import TopBar from "src/components/Topbar";
import { useEffect } from "react";

export default function Dashboard() {
    const { data: user, isLoading, error } = useQuery({
        queryKey: ["user"],
        queryFn: getUserData,
    });

    const id = user?.data?.id;
    const { data: role, isLoading: load } = useQuery({
        queryKey: ["role", id],
        queryFn: () => getRole(id),
    });

    if (error) return <div>User not authorized</div>;

    return (
        <div className="w-full h-screen bg-black flex items-end justify-end overflow-hidden">
            <Sidebar />
            <div className="h-full w-full px-2">
                <TopBar />

                {/* page content starts */}
                <div className="bg-white no-scrollbar dark:bg-zinc-900 dark:text-white rounded-xl divide-y-2 p-2 h-[calc(100%-4rem)] overflow-y-scroll scroll-smooth">
                    {
                        isLoading ? <Skeleton className="h-24 mb-2 w-[250px] rounded-xl" /> :
                            <div className="flex flex-col p-2 h-24 mb-2 font-[600]">
                                <div className="dark:text-white text-gray-500">
                                    Welcome back
                                </div>
                                <div className="text-3xl font-semibold space-y-3">
                                    {user?.data?.login}
                                </div>
                            </div>
                    }
                    <div>
                        <div className="text-2xl font-semibold p-2">
                            {
                                !load ? (
                                    <>{role?.data}</>
                                ) : (<>Loading...</>)
                            }
                        </div>
                        <div className="flex flex-col gap-5 p-2">
                            <Skeleton className="h-[125px] w-full rounded-xl" />
                            <Skeleton className="h-[125px] w-full rounded-xl" />
                            <Skeleton className="h-[125px] w-full rounded-xl" />
                            <Skeleton className="h-[125px] w-full rounded-xl" />
                            <Skeleton className="h-[125px] w-full rounded-xl" />
                            <Skeleton className="h-[125px] w-full rounded-xl" />
                        </div>
                    </div>
                </div>
                {/* page content ends */}
            </div>
        </div>
    );
}