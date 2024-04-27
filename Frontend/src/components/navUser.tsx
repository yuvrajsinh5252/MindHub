import { Loader2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { ModeToggle } from "./theme/mode-toggle";
import useAuth from "@/hook/useAuth";
import { Button } from "./ui/button";

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
                                    onClick={() => navigation({ to: "/login" })}
                                >Profile</DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => navigation({ to: "/login" })}
                                >Billing</DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => navigation({ to: "/login" })}
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
                            <div className="flex justify-center items-center text-zinc-600">
                                <Loader2 className="animate-spin lg:w-9 lg:h-9 w-8 h-8" />
                            </div>
                        ) : (
                            <Button
                                onClick={() => navigation({ to: "/login" })}
                                variant={"secondary"}
                            >
                                Login
                            </Button>
                        )
                    )
                }
            </div>
        </div>
    )
}