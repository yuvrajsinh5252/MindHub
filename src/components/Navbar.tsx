import Hamburger from "./Hamburger";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

const noNavbarRoute = ["/login", "/register"];

export default function Navbar() {
    const { pathname } = useLocation();
    const [code, setCode] = useState("");
    const navigation = useNavigate();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");
        if (code) setCode(code);
    }, []);

    const {
        handleLogout,
        isAuthenticated,
        loading,
        user,
    } = useAuth();

    if (noNavbarRoute.some((route) => route === pathname)) return null;

    return (
        <nav>
            <div className="w-full h-16 shadow-md">
                <div>
                    <div className="flex justify-around max-sm:justify-between max-sm:mx-10 items-center h-16">
                        <h1 className="font-bold text-gray-700 text-xl">MindHub</h1>
                        <div className="max-sm:hidden w-[300px] cursor-pointer flex items-center">
                            <a href={"/?code=" + code} className="w-full text-center hover:border-b-2 mx-2 border-gray-400">Home</a>
                            <a href={"/Dashboard/?code=" + code} className="w-full text-center hover:border-b-2 mx-2 border-gray-400">About</a>
                            <a href={"/Contact/?code=" + code} className="w-full text-center hover:border-b-2 mx-2 border-gray-400">Contact</a>
                            <div className="w-full">
                                {
                                    isAuthenticated ? (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <div className='mx-2 flex justify-center flex-col items-center'>
                                                    <img
                                                        className='w-10 h-10 rounded-full'
                                                        src={user.avatar_url}
                                                        alt={user.login}
                                                        onClick={handleLogout}
                                                    />
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                                <DropdownMenuItem>courses</DropdownMenuItem>
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
                                            <div className="mx-2 flex justify-center items-center">
                                                <Loader2 className="animate-spin" />
                                            </div>
                                        ) : (
                                            <button
                                                className='w-full text-center hover:border-b-2 mx-2 border-gray-400'
                                                onClick={() => navigation("/login")}>
                                                Login
                                            </button>
                                        )
                                    )
                                }
                            </div>
                        </div>
                        <Hamburger />
                    </div>
                </div>
            </div>
        </nav>
    )
}