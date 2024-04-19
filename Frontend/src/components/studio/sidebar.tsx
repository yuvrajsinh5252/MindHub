import useAuth from "@/hook/useAuth";
import { useGithubUser } from "@/querries/db";
import { useNavigate } from "@tanstack/react-router";
import { BadgeCheck, GraduationCap, LayoutDashboard, LogOut, MonitorPlay, Podcast } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export default function Sidebar({ open }: { open: boolean }) {
    const [path, setPath] = useState<string>("/dashboard");
    const { handleLogout } = useAuth();
    const navigate = useNavigate();
    const { data: user, isLoading } = useGithubUser();

    useEffect(() => {
        setPath(window.location.pathname);
    }, [window.location.pathname]);

    return (
        <div className={`h-full text-white w-0 flex justify-start flex-col overflow-x-hidden transition-all duration-300 ease-in-out overflow-y-scroll ${open ? "min-w-16" : "min-w-52"}`}>
            <div className={`flex flex-col font-semibold text-xl justify-start items-center py-5 ${open ? "" : "pb-14"}`}>
                <GraduationCap size={open ? 38 : 60} />
                <span className={`${open ? "hidden" : "visible"}`}>MindHub</span>
            </div>
            <div className="border-b-2 border-white"></div>
            {
                isLoading ? (
                    <div className={`mt-5 flex items-start gap-5 + ${open ? "hidden" : "visible"}`}>
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div className="flex flex-col gap-2">
                            <Skeleton className="w-24 h-4" />
                            <Skeleton className="w-12 h-4" />
                        </div>
                    </div>
                ) : (
                    <div className={`mt-5 flex items-start gap-5 + ${open ? "hidden" : "visible"}`}>
                        <div className="ml-2">
                            <img
                                className="w-12 h-12 rounded-full"
                                src={user?.data.avatar_url}
                                alt="avatar"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex gap-2 text-lg">
                                {user?.data.login}
                                {true ? <BadgeCheck /> : <></>}
                            </div>
                            <button
                                onClick={() => navigate({ to: "/" })}
                                className="text-xs text-gray-100 mr-auto"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                )
            }
            <div className={`flex flex-col gap-5 items-start h-full px-2 pb-10 ${open ? "pt-5" : "pt-14"}`}>
                <button
                    onClick={() => navigate({ to: "/creator-dashboard" })}
                    className={"flex gap-3 items-start justify-center bg-black rounded-lg p-2 w-full" +
                        (path === "/creator-dashboard" ? " bg-white text-black" : "")
                    }>
                    <LayoutDashboard />
                    <span className={`${open ? "hidden" : "visible"}`}>Dashboard</span>
                </button>
                <button
                    onClick={() => navigate({ to: "/creator-studio" })}
                    className={"flex gap-3 items-start justify-center bg-black rounded-lg p-2 w-full" +
                        (path === "/creator-studio" ? " bg-white text-black" : "")
                    }>
                    <MonitorPlay />
                    <span className={`${open ? "hidden" : "visible"}`}>Studio</span>
                </button>
                <button
                    onClick={() => navigate({ to: "/creator-studio" })}
                    className={"flex gap-3 items-start justify-center bg-black rounded-lg p-2 w-full" +
                        (path === "/Ccreator-studio" ? " bg-white text-black" : "")
                    }>
                    <Podcast />
                    <span className={`${open ? "hidden" : "visible"}`}>Go Live</span>
                </button>
            </div>

            <footer onClick={handleLogout} className="w-full flex gap-3 cursor-pointer p-3 m-auto border-t-2">
                <LogOut />
                <span className={`${open ? "hidden" : "visible"}`}>Logout</span>
            </footer>
        </div >
    );
}