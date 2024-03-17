import axios from "src/api/axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../querries/db";

export default function Roles() {
    const [role, setRole] = useState("");
    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: getUserData,
    });

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center border-2 rounded-md flex-col gap-5 items-center p-8">
                <div className="flex gap-3 w-20">
                    <input type="radio" id="user" name="role" value="user" onChange={(e) => setRole(e.target.value)} />
                    <label className="font-semibold" htmlFor="user">User</label>
                </div>
                <div className="flex gap-3 w-20">
                    <input type="radio" id="creater" name="role" value="creater" onChange={(e) => setRole(e.target.value)} />
                    <label className="font-semibold" htmlFor="creater">Creater</label>
                </div>

                <button
                    onClick={async () => {
                        if (role) {
                            await axios.post("/db/setRole", {
                                id: user?.data?.id,
                                role: "user",
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