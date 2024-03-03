import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../querries/db";
import { Skeleton } from "src/components/ui/skeleton";
import Sidebar from "src/components/sidebar";
import TopBar from "src/components/Topbar";
import { Hand, LeafyGreen } from "lucide-react";

export default function Dashboard() {
    const { data: user, isLoading, error } = useQuery({
        queryKey: ["user"],
        queryFn: getUserData,
    });

    if (error) return <div>User not authorized</div>;

    return (
        <div className="w-full h-screen bg-black flex items-end justify-end">
            <div className="max-sm:hidden text-white flex justify-start h-full w-1/6">
                <Sidebar />
            </div>
            <div className="h-full w-full px-2">
                <div className="h-[7%] min-h-12 text-white">
                    <TopBar />
                </div>
                <div className="bg-white rounded-xl divide-y-2 h-[92%] p-2">
                    {
                        isLoading ? <Skeleton className="h-[125px] w-[250px] rounded-xl" /> :
                        <div className="flex flex-col p-2 h-24 font-[600] text-gray-500">
                            Welcome back
                            <div className="text-3xl font-semibold text-black space-y-3">
                                {user?.data?.login}
                            </div>
                        </div>
                    }
                    <div>
                    </div>
                </div>
            </div>
        </div>
    );
}