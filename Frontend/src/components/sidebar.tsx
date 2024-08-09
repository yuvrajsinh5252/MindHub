import { Book, GraduationCap, LayoutDashboard, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import useAuth from "@/hook/useAuth";

export default function Sidebar({ open }: { open: boolean }) {
    const [path, setPath] = useState<string>("/dashboard");
    const navigate = useNavigate();
    const { handleLogout } = useAuth();

    useEffect(() => {
        setPath(window.location.pathname);
    }, [window.location.pathname]);

    return (
        <div className={`h-full w-0 flex justify-start flex-col overflow-x-hidden transition-all duration-300 ease-in-out pr-2 overflow-y-scroll divide-y-2 gap-3 ${open ? "min-w-16" : `min-w-52`}`}>
            <div className={`flex flex-col font-semibold text-xl justify-start items-center py-5 ${open ? "" : "pb-14"}`}>
                <GraduationCap size={open ? 38 : 60} />
                <span className={`${open ? "hidden" : "visible"}`}>MindHub</span>
            </div>
            <div className={`flex flex-col gap-5 items-start h-full px-2 pb-10 ${open ? "pt-5" : "pt-14"}`}>
                <button
                    onClick={() => navigate({ to: "/dashboard" })}
                    className={"flex gap-3 items-start justify-center rounded-lg p-2 w-full" +
                        (path === "/dashboard" ? " bg-white text-black" : "")
                    }>
                    <LayoutDashboard />
                    <span className={`${open ? "hidden" : "visible"} w-24`}>Dashboard</span>
                </button>
                <button
                    onClick={() => navigate({ to: "/browsecourse" })}
                    className={"flex gap-3 items-start justify-center rounded-lg p-2 w-full" +
                        (path === "/browsecourse" ? " bg-white text-black" : "")
                    }>
                    <Book />
                    <span className={`${open ? "hidden" : "visible"}`}>Browse courses</span>
                </button>
            </div>

            <footer onClick={handleLogout} className="w-full flex gap-3 cursor-pointer p-3 m-auto border-t-2">
                <LogOut />
                <span className={`${open ? "hidden" : "visible"}`}>Logout</span>
            </footer>
        </div >
    )
}