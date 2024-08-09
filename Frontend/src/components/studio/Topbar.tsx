import { Bell, Search } from "lucide-react";
import { ModeToggle } from "../theme/mode-toggle";
import { Skeleton } from "../ui/skeleton";
import { useGithubUser } from "@/querries/db";
import { Input } from "../ui/input";

export default function TopBar() {
  const { data: user } = useGithubUser();

  return (
    <div className="flex items-center py-2 pr-2 gap-2">
      <div className="w-full relative flex justify-start ">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <div className="flex gap-3 w-72 justify-end">
        <div className="flex justify-center items-center rounded-md w-10 h-10">
          <Bell className="h-5 w-5" />
        </div>
        <ModeToggle />
        {
          user ? (
            <img
              className="w-10 h-10 rounded-full"
              src={user?.data.avatar_url}
              alt="avatar"
            />
          ) : (
            <Skeleton className="w-10 h-10 rounded-full" />
          )
        }
      </div>
    </div >
  );
}
