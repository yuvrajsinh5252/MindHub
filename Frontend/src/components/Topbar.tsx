import { GraduationCap, Search } from "lucide-react";
import NavUser from "./navUser";
import { Input } from "./ui/input";

export default function TopBar() {
  return (
    <div className="flex justify-start items-center py-2 gap-2">
      <GraduationCap className="sm:hidden h-10 w-16" />
      <div className="w-full relative flex justify-start ">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <div className="text-black px-2 w-48">
        <NavUser />
      </div>
    </div>
  );
}
