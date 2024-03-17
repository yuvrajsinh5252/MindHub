import useAuth from "src/hooks/useAuth";
import { Book, GraduationCap, LayoutDashboard, LogOut, Mails, Radio, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
                    onClick={() => navigate("/dashboard")}
                    className={"flex gap-3 items-start bg-black rounded-lg p-2 w-full min-w-32" +
                        (path === "/dashboard" ? " bg-white text-black" : "")
                    }>
                    <LayoutDashboard />
                    Dashboard
                </button>
                <button
                    onClick={() => navigate("/Browsecourses")}
                    className={"flex gap-3 items-start bg-black rounded-lg p-2 w-full min-w-32" +
                        (path === "/Browsecourses" ? " bg-white text-black" : "")
                    }>
                    <Book />
                    Browse Courses
                </button>
                <button
                    onClick={() => navigate("/courses")}
                    className={"flex gap-3 items-start bg-black rounded-lg p-2 w-full min-w-32" +
                        (path === "/courses" ? " bg-white text-black" : "")
                    }>
                    <Book />
                    My Courses
                </button>
                <button
                    onClick={() => navigate("/Live")}
                    className={"flex gap-3 items-start bg-black rounded-lg p-2 w-full min-w-32" +
                        (path === "/Live" ? " bg-white text-black" : "")
                    }>
                    <Radio />
                    Live
                </button>
                <button
                    onClick={() => navigate("/Messages")}
                    className={"flex gap-3 items-start bg-black rounded-lg p-2 w-full min-w-32" +
                        (path === "/Messages" ? " bg-white text-black" : "")
                }>
                    <Mails />
                    Messages
                </button>
                <button
                    onClick={() => navigate("/settings")}
                    className={"flex gap-3 items-start bg-black rounded-lg p-2 w-full min-w-32" +
                        (path === "/settings" ? " bg-white text-black" : "")
                    }>
                    <Settings />
                    Settings
                </button>
            </div>

            <footer className="w-full flex gap-3 p-4 m-1 border-t-2">
                <LogOut />
                <div onClick={handleLogout} className="cursor-pointer">
                    Logout
                </div>
            </footer>
        </div>
    )
}