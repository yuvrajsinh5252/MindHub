import useAuth from "src/hooks/useAuth";
import { GraduationCap, LayoutDashboard, LogOut, MonitorPlay } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const [path, setPath] = useState<string>("/dashboard");
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setPath(window.location.pathname);
    }, []);

    return (
        <div className="min-w-52 h-full max-sm:hidden text-white flex justify-start flex-col overflow-x-hidden overflow-y-scroll">
            <div className="flex flex-col font-semibold text-xl justify-start items-center py-5 ">
                <GraduationCap size={60} />
                MindHub
            </div>
            <div className="flex flex-col gap-5 items-start h-full px-2 pt-10 pb-10">
                <button
                    onClick={() => navigate("/creator-dashboard")}
                    className={"flex gap-3 items-start bg-black rounded-lg p-2 w-full min-w-32" +
                        (path === "/creator-dashboard" ? " bg-white text-black" : "")
                    }>
                    <LayoutDashboard />
                    Dashboard
                </button>
                <button
                    onClick={() => navigate("/creator-studio")}
                    className={"flex gap-3 items-start bg-black rounded-lg p-2 w-full min-w-32" +
                        (path === "/creator-studio" ? " bg-white text-black" : "")
                    }>
                    <MonitorPlay />
                    Studio
                </button>
            </div>

            <footer className="w-full flex gap-3 p-4 m-1 border-t-2">
                <LogOut />
                <div onClick={handleLogout} className="cursor-pointer">
                    Logout
                </div>
            </footer>
        </div>
    );
}