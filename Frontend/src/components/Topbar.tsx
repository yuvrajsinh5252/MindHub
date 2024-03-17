import { GraduationCap, Search } from "lucide-react";
import NavUser from "./Navuser";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover"

export default function TopBar() {
  return (
    <div className="text-white flex justify-start items-center py-2 gap-2">
      <GraduationCap className="sm:hidden h-10 w-16"/>
      <Popover>
        <div className="w-full flex gap-2">
          <input
            type="text"
            className="dark:text-white text-black max-sm:hidden focus:outline-none w-2/6 min-w-40 h-10 rounded-md p-2"
            placeholder="Search"
          />
          <PopoverTrigger>
            <Search className="lg:hidden" size={24} />
          </PopoverTrigger>
          <div className="lg:border-2 px-2 border-zinc-500 rounded-lg">
            <span className="m-1 lg:block hidden">Search</span>
          </div>
        </div>

        <PopoverContent align="end" sideOffset={10}>
          <input
            type="text"
            className="text-black focus:outline-none w-2/6 max-sm:h-9 rounded-md p-2"
            placeholder="Search"
          />
        </PopoverContent>
      </Popover>

      <div className="text-black px-2 w-48">
        <NavUser />
      </div>
    </div>
  );
}
