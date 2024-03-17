import TopBar from "src/components/Topbar";
import Sidebar from "src/components/sidebar";

export default function MyCourses() {
    return (
        <div className="w-full h-screen bg-black flex items-end justify-end overflow-hidden">
            <Sidebar />
            <div className="h-full w-full px-2">
                <TopBar />

                {/* page content starts */}
                <div className="bg-white no-scrollbar dark:bg-zinc-900 dark:text-white rounded-xl divide-y-2 p-2 h-[calc(100%-4rem)] overflow-y-scroll scroll-smooth">
                    My  Courses
                </div>
                {/* page content ends */}
            </div>
        </div>
    );
}