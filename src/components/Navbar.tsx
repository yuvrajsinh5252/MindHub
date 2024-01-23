import Hamburger from "./Hamburger";

export default function Navbar() {
    return (
        <nav>
            <div className="bg-blue-200 w-full h-16 fixed top-0">
                <div>
                    <div className="flex justify-around max-sm:justify-between max-sm:mx-10 items-center h-16">
                        <h1 className="font-bold text-gray-700 text-xl">MindHub</h1>
                        <div className="max-sm:hidden w-[300px] flex items-center">
                            <a href="/Home" className="w-full text-center hover:border-b-2 mx-2 border-gray-400">Home</a>
                            <a href="/About" className="w-full text-center hover:border-b-2 mx-2 border-gray-400">About</a>
                            <a href="/Contact" className="w-full text-center hover:border-b-2 mx-2 border-gray-400">Contact</a>
                            <a href="/Login" className="w-full text-center hover:border-b-2 mx-2 border-gray-400">Login</a>
                        </div>
                        <Hamburger />
                    </div>
                </div>
            </div>
        </nav>
    )
}