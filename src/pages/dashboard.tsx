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
        <div>
            <h1>Dashboard</h1>
            <p>Name: {data?.name}</p>
            <p>id: {data?.id}</p>
        </div>
    );
}