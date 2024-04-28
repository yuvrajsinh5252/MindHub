import { Bell, Search } from "lucide-react";
import { ModeToggle } from "../theme/mode-toggle";
import { Skeleton } from "../ui/skeleton";
import { useGithubUser } from "@/querries/db";

export default function TopBar() {
  const { data: user } = useGithubUser();

  return (
    <div className="flex items-center py-2 pr-2 gap-2">
      <div className="w-full flex justify-start">
        <input
          type="text"
          className="focus:outline-none w-5/12 min-w-40 h-10 rounded-s-md text-background p-2"
          placeholder="Search..."
        />
        <Search className="p-1.5 pr-2 h-10 w-10 rounded-e-md text-background bg-white" />
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
