export default function Navbar() {
    return (
        <nav>
            <div className="bg-blue-200 w-full h-16 fixed top-0">
                <div>
                    <div className="flex justify-around items-center h-16">
                        <h1 className="font-bold font-poppins text-gray-700 text-xl">MindHub</h1>
                        <div className="flex justify-around gap-10 items-center">
                            <a href="/">Home</a>
                            <a href="/">About</a>
                            <a href="/">Contact</a>
                            <a href="/">Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}