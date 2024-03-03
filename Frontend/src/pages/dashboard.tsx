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
        <div className="w-full bg-black h-screen flex items-end justify-end">
            <div className="max-sm:hidden text-white flex justify-start h-screen w-1/6">
                <Sidebar />
            </div>
            <div className="h-screen w-full p-2">
                <div className="h-[8%] text-white">
                    <TopBar />
                </div>
                <div className="bg-white rounded-xl divide-y-2 h-[92%] p-2">
                    {
                        isLoading ? <Skeleton className="h-[125px] w-[250px] rounded-xl" /> :
                        <div className="flex items-center h-24 gap-4 px-2 text-2xl font-semibold space-y-3">
                            welcome back, {user?.data?.login}
                            <LeafyGreen size={32} />
                        </div>
                    }
                    <div>
                        asdasd
                    </div>
                </div>
            </div>
        </div>
    );
}