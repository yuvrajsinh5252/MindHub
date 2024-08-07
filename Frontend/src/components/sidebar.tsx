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
        <div className={`h-full w-0 flex justify-start flex-col overflow-x-hidden transition-all duration-300 ease-in-out overflow-y-scroll divide-y-2 gap-3 ${open ? "min-w-16" : `min-w-52`}`}>
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
                    <span className={`${open ? "hidden" : "visible"}`}>Dashboard</span>
                </button>
                <button
                    onClick={() => navigate({ to: "/Browsecourses" })}
                    className={"flex gap-3 items-start justify-center rounded-lg p-2 w-full" +
                        (path === "/Browsecourses" ? " bg-white text-black" : "")
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
        // <div className="min-w-52 h-full max-sm:hidden text-White flex justify-start flex-col overflow-x-hidden overflow-y-scroll">
        //     <div className="flex flex-col font-semibold text-xl justify-start items-center py-5 ">
        //         <GraduationCap size={60} />
        //         MindHub
        //     </div>
        //     <div className="flex flex-col gap-5 items-start h-full px-2 pt-10 pb-10">
        //         <button
        //             onClick={() => navigate({ to: "/dashboard" })}
        //             className={"flex gap-3 items-start bg-Black rounded-lg p-2 w-full min-w-32" +
        //                 (path === "/dashboard" ? " bg-White text-Black" : "")
        //             }>
        //             <LayoutDashboard />
        //             Dashboard
        //         </button>
        //         <button
        //             onClick={() => navigate({ to: "/Browsecourses" })}
        //             className={"flex gap-3 items-start bg-Black rounded-lg p-2 w-full min-w-32" +
        //                 (path === "/Browsecourses" ? " bg-White text-Black" : "")
        //             }>
        //             <Book />
        //             Browse Courses
        //         </button>
        //         <button
        //             onClick={() => navigate({ to: "/Mycourses" })}
        //             className={"flex gap-3 items-start bg-Black rounded-lg p-2 w-full min-w-32" +
        //                 (path === "/Mycourses" ? " bg-White text-Black" : "")
        //             }>
        //             <Book />
        //             My Courses
        //         </button>
        //         <button
        //             onClick={() => navigate({ to: "/Live" })}
        //             className={"flex gap-3 items-start bg-Black rounded-lg p-2 w-full min-w-32" +
        //                 (path === "/Live" ? " bg-White text-Black" : "")
        //             }>
        //             <Radio />
        //             Live
        //         </button>
        //         <button
        //             onClick={() => navigate({ to: "/Messages" })}
        //             className={"flex gap-3 items-start bg-Black rounded-lg p-2 w-full min-w-32" +
        //                 (path === "/Messages" ? " bg-White text-Black" : "")
        //             }>
        //             <Mails />
        //             Messages
        //         </button>
        //         <button
        //             onClick={() => navigate({ to: "/settings" })}
        //             className={"flex gap-3 items-start bg-Black rounded-lg p-2 w-full min-w-32" +
        //                 (path === "/settings" ? " bg-White text-Black" : "")
        //             }>
        //             <Settings />
        //             Settings
        //         </button>
        //     </div>

        //     <footer className="w-full flex gap-3 p-4 m-1 border-t-2">
        //         <LogOut />
        //         <div onClick={handleLogout} className="cursor-pointer">
        //             Logout
        //         </div>
        //     </footer>
        // </div>
    )
}