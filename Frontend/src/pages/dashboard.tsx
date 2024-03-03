import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../querries/db";
import { Skeleton } from "src/components/ui/skeleton";

export default function Dashboard() {
    const { data: user, isLoading, error } = useQuery({
        queryKey: ["user"],
        queryFn: getUserData,
    });

    if (isLoading) {
        return (
            <div className="mt-10 flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            </div>
        )
    }
    if (error) return <div>User not authorized</div>;

    return (
        <div className="m-auto flex items-center mt-10 flex-col">
            <h1>Dashboard</h1>
            <div>
                <h2>welcome  {user?.data.login}</h2>
            </div>
        </div>
    );
}