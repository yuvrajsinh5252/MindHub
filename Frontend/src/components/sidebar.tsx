import { Book, BookOpen, GraduationCap, LayoutDashboard, LogOut, Mails, Radio, Settings } from "lucide-react";

export default function Sidebar() {
    return (
        <div className="w-full min-w-54">
            <div className="flex flex-col font-semibold text-xl justify-start items-center py-5 ">
                <GraduationCap size={60} />
                MindHub
            </div>
            <div className="flex flex-col gap-5 items-start p-2 py-11">
                <button className="flex gap-3 items-start bg-black focus:bg-white focus:text-black rounded-lg p-2 w-full min-w-32">
                    <LayoutDashboard />
                    Dashboard
                </button>
                <button className="flex gap-3 items-start bg-black focus:bg-white focus:text-black rounded-lg p-2 w-full min-w-32">
                    <Book />
                    Browse Courses
                </button>
                <button className="flex gap-3 items-start bg-black focus:bg-white focus:text-black rounded-lg p-2 w-full min-w-32">
                    <Book />
                    My Courses
                </button>
                <button className="flex gap-3 items-start bg-black focus:bg-white focus:text-black rounded-lg p-2 w-full min-w-32">
                    <Radio />
                    Live
                </button>
                <button className="flex gap-3 items-start bg-black focus:bg-white focus:text-black rounded-lg p-2 w-full min-w-32">
                    <Mails />
                    Messages
                </button>
                <button className="flex gap-3 items-start bg-black focus:bg-white focus:text-black rounded-lg p-2 w-full min-w-32">
                    <Settings />
                    Settings
                </button>
            </div>

            <footer className="flex gap-3 p-4 m-1 border-t-2">
                <LogOut />
                Logout
            </footer>
        </div>
    )
}