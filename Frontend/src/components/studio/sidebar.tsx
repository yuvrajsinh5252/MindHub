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
        <div className={`min-w-52 h-full max-sm:hidden text-white flex justify-start flex-col overflow-x-hidden overflow-y-scroll ${open ? "hidden" : "visible"}`}>
            <div className="flex flex-col pb-14 font-semibold text-xl justify-start items-center py-5 ">
                <GraduationCap size={60} />
                MindHub
            </div>
            <div className="border-t-2 border-b-2 border-white"></div>
            {
                isLoading ? (
                    <div className="mt-5 flex items-start gap-5">
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div className="flex flex-col gap-2">
                            <Skeleton className="w-24 h-4" />
                            <Skeleton className="w-12 h-4" />
                        </div>
                    </div>
                ) : (
                    <div className="mt-5 flex items-start gap-5">
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
            <div className="flex flex-col gap-5 items-start h-full px-2 pt-14 pb-10">
                <button
                    onClick={() => navigate({ to: "/creator-dashboard" })}
                    className={"flex gap-3 items-start bg-black rounded-lg p-2 w-full min-w-32" +
                        (path === "/creator-dashboard" ? " bg-white text-black" : "")
                    }>
                    <LayoutDashboard />
                    Dashboard
                </button>
                <button
                    onClick={() => navigate({ to: "/creator-studio" })}
                    className={"flex gap-3 items-start bg-black rounded-lg p-2 w-full min-w-32" +
                        (path === "/creator-studio" ? " bg-white text-black" : "")
                    }>
                    <MonitorPlay />
                    Studio
                </button>
                <button
                    onClick={() => navigate({ to: "/creator-studio" })}
                    className={"flex gap-3 items-start bg-black rounded-lg p-2 w-full min-w-32" +
                        (path === "/creator-studio" ? " bg-white text-black" : "")
                    }>
                    <Podcast />
                    Go Live
                </button>
            </div>

            <footer className="w-full flex gap-3 p-4 m-1 border-t-2">
                <LogOut />
                <div onClick={handleLogout} className="cursor-pointer">
                    Logout
                </div>
            </footer>
        </div >
    );
}