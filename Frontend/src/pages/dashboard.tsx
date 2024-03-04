import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../querries/db";
import { Skeleton } from "src/components/ui/skeleton";
import Sidebar from "src/components/sidebar";
import TopBar from "src/components/Topbar";

export default function Dashboard() {
    const { data: user, isLoading, error } = useQuery({
        queryKey: ["user"],
        queryFn: getUserData,
    });

    if (error) return <div>User not authorized</div>;

    return (
        <div className="w-full h-screen bg-black flex items-end justify-end overflow-hidden">
            <Sidebar />
            <div className="h-full w-full px-2">
                <TopBar />

                {/* page content starts */}
                <div className="bg-white rounded-xl divide-y-2 p-2 h-[calc(100%-4rem)] overflow-y-scroll">
                    {
                        isLoading ? <Skeleton className="h-24 mb-2 w-[250px] rounded-xl" /> :
                            <div className="flex flex-col p-2 h-24 font-[600] text-gray-500">
                                Welcome back
                                <div className="text-3xl font-semibold text-black space-y-3">
                                    {user?.data?.login}
                                </div>
                            </div>
                    }
                    <div>
                        <div className="text-2xl font-semibold text-black p-2">
                            Your Courses
                        </div>
                        <div className="flex flex-col gap-5 p-2">
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