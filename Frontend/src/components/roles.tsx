import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../querries/db";
import axios from "@/api/axios";

export default function Roles() {
    const [role, setRole] = useState("");
    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: getUserData,
    });

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center border-2 rounded-md flex-col gap-5 p-8">
                <div className="flex gap-3 w-22">
                    <input type="radio" id="user" name="role" value="user"
                        className="w-4 h-4 rounded-full appearance-none border border-gray-300 bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-0"
                        onChange={(e) => setRole(e.target.value)}
                    />
                    <label className="font-semibold text-xl" htmlFor="user">User</label>
                </div>
                <div className="flex gap-3 w-22">
                    <input type="radio" id="creator" name="role" value="creator"
                        className="w-4 h-4 rounded-full appearance-none border border-gray-300 bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-0"
                        onChange={(e) => setRole(e.target.value)}
                    />
                    <label className="font-semibold text-xl" htmlFor="creator">Creater</label>
                </div>

                <button
                    onClick={async () => {
                        if (role) {
                            await axios.post("/db/setRole", {
                                id: user?.data?.id,
                                role: role,
                            });

                            window.location.assign("/dashboard");
                        }
                    }}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}