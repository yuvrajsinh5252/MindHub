import Hamburger from "./Hamburger";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ModeToggle } from "./Theme-toggle";

const noNavbarRoute = ["/login", "/register"];

export default function Navbar() {
    const { pathname } = useLocation();
    const navigation = useNavigate();

    const {
        handleLogout,
        isAuthenticated,
        loading,
        user,
    } = useAuth();

    if (noNavbarRoute.some((route) => route === pathname)) return null;

    return (
        <nav>
            <div className="w-full h-16 shadow-md dark:border-2">
                <div>
                    <div className="flex justify-around max-sm:justify-between max-sm:mx-10 items-center h-16">
                        <h1 className="dark:text-white font-bold text-gray-700 text-2xl">
                            MindHub
                        </h1>
                        <div className="max-sm:hidden w-[350px] divide-x-2 cursor-pointer flex items-center">
                            <div>
                                <a href={"/"} className="w-full text-center hover:border-b-2 mx-2 border-gray-400">
                                    Home
                                </a>
                                <a href={"/Dashboard"} className="w-full text-center hover:border-b-2 mx-2 border-gray-400">
                                    About
                                </a>
                                <a href={"/Contact"} className="w-full text-center hover:border-b-2 mx-2 border-gray-400">
                                    Contact
                                </a>
                            </div>
                            <div className="flex gap-2 mx-2 items-center justify-center w-[500px]">
                                <ModeToggle />
                                <div>
                                    {
                                        isAuthenticated ? (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <div className='flex justify-center flex-col items-center'>
                                                        <img
                                                            className='w-10 h-9 rounded-full'
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
                        </div>
                        <Hamburger />
                    </div>
                </div>
            </div>
        </nav>
    )
}