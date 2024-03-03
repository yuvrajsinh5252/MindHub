import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../querries/db";

export default function Dashboard() {
    const { data: user, isLoading, error } = useQuery({
        queryKey: ["user"],
        queryFn: getUserData,
    });

    if (isLoading) return <div className="pt-20">Loading content...</div>;
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