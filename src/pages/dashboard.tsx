import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../querry/db";

export default function Dashboard() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["userData"],
        queryFn: getUserData,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;

    return (
        <div className="m-auto flex items-center mt-10 flex-col">
            <h1>Dashboard</h1>
            <div>
                <h2>welcome  {data.username}</h2>
            </div>
        </div>
    );
}