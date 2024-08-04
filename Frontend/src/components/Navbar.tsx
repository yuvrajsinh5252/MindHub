import NavUser from "./navUser";
import Hamburger from "./Hamburger";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";


const noNavbarRoute = ["/"];

export default function Navbar() {
    const pathname = window.location.pathname;

    if (!noNavbarRoute.some((route) => route === pathname)) return null;

    return (
        <nav>
            <div className="w-full h-16  bg-transparent z-10 fixed">
                <div>
                    <div className="flex justify-around max-sm:justify-between max-sm:mx-5 items-center h-16">
                        <h1 className="text-2xl max-sm:text-[20px] font-semibold">
                            MindHub
                        </h1>
                        <div className="w-[400px] max-sm:w-36 lg:divide-x-2 cursor-pointer flex justify-center items-center">
                            <div className="max-sm:hidden flex gap-2 px-2">
                                <Button variant={"ghost"}>
                                    <Link to="/">Home</Link>
                                </Button>
                                <Button variant={"ghost"}>
                                    <Link to="/">About</Link>
                                </Button>
                                <Button variant={"ghost"}>
                                    <Link to="/">Contact</Link>
                                </Button>
                            </div>
                            <NavUser />
                            <Hamburger />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}