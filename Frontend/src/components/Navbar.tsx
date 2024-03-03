import Hamburger from "./Hamburger";
import { useLocation, useNavigate } from "react-router-dom";
import NavUser from "./navUser";

const noNavbarRoute = ["/login", "/register"];

export default function Navbar() {
    const { pathname } = useLocation();
    const navigation = useNavigate();

    if (noNavbarRoute.some((route) => route === pathname)) return null;

    return (
        <nav>
            <div className="w-full h-16 shadow-md dark:border-2">
                <div>
                    <div className="flex justify-around max-sm:justify-between max-sm:mx-5 items-center h-16">
                        <h1 className="dark:text-white font-bold text-gray-700 text-2xl max-sm:text-[20px]">
                            MindHub
                        </h1>
                        <div className="w-[320px] max-sm:w-28 lg:divide-x-2 cursor-pointer flex items-center justify-center">
                            <div className="max-sm:hidden">
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
                            <NavUser navigation={navigation} />
                            <Hamburger />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}