import useAuth from "../hooks/useAuth";
import { Loader2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ModeToggle } from "./Theme-toggle";

export default function NavUser(navigation: any) {
    const {
        handleLogout,
        isAuthenticated,
        loading,
        user,
    } = useAuth();

    return (
        <div className="flex gap-2 mx-2 items-center justify-end w-[100px]">
            <ModeToggle />
            <div>
                {
                    isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className='h-10 flex justify-center flex-col items-center'>
                                    <img
                                        className='lg:w-10 lg:h-9 w-8 h-7 rounded-full'
                                        src={user.avatar_url}
                                        alt={user.login}
                                        onClick={handleLogout}
                                    />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => navigation("/profile")}
                                >Profile</DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => navigation("/billing")}
                                >Billing</DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => navigation("/courses")}
                                >courses</DropdownMenuItem>
                                <DropdownMenuItem>Subscription</DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                >
                                    logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        loading ? (
                            <div className="flex mx-2 justify-center items-center">
                                <Loader2 className="animate-spin" />
                            </div>
                        ) : (
                            <button
                                className='text-center hover:border-b-2 mx-2 border-gray-400'
                                onClick={() => navigation("/login")}>
                                Login
                            </button>
                        )
                    )
                }
            </div>
        </div>
    )
}