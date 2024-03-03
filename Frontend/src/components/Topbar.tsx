import { Search } from "lucide-react";
import NavUser from "./navUser";

export default function TopBar() {
    return (
        <div className="h-full text-white flex justify-start items-center">
            <div className="w-full flex gap-2">
                <input type="text" className="w-2/6 min-w-40 h-10 max-sm:h-9 rounded-md p-2" placeholder="Search" />
                <button className="lg:border-2 border-zinc-500 rounded-lg px-2">
                    <Search className="lg:hidden" size={24} />
                    <span className="lg:block hidden">Search</span>
                </button>
            </div>
            <div className="text-black px-2 w-[150px]">
                <NavUser />
            </div>
        </div>
    )
}