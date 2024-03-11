import useAuth from "../hooks/useAuth";
import { Loader2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { ModeToggle } from "./Theme-toggle";
import { useNavigate } from "react-router-dom";

export default function NavUser() {
    const {
        handleLogout,
        isAuthenticated,
        loading,
        user,
    } = useAuth();

    const navigation = useNavigate();

    return (
        <div className="h-10 flex gap-4 items-center justify-end px-2">
            <ModeToggle />
            <div>
                {
                    isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className='flex justify-center items-center'>
                                    <img
                                        className='lg:w-9 lg:h-9 w-8 h-8 rounded-full'
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
                            <div className="flex justify-center items-center">
                                <Loader2 className="text-white animate-spin lg:w-9 lg:h-9 w-8 h-8" />
                            </div>
                        ) : (
                            <button
                                className='text-center bg-black text-white rounded-md px-2 hover:bg-gray-600 transition-all duration-300 ease-in-out'
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