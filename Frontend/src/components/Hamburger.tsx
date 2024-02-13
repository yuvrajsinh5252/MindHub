import { useState } from "react";

export default function Hamburger(user: any) {
    const [open, setOpen] = useState(true);

    return (
        <div className="lg:hidden xl:hidden sm:hidden">
            <div className="flex justify-around flex-col gap-1 w-10" onClick={() => { setOpen(!open) }}>
                <div className="h-1 w-8 z-10 dark:bg-white bg-black transition"
                    style={
                        !open ? { transform: 'rotate(-45deg)', width: '1.68rem' } : { transform: 'rotate(0)' }
                    }
                ></div>
                <div className="h-1 w-8 z-10 dark:bg-white bg-black transition"
                    style={
                        !open ? { transform: 'translateX(15%)', width: '2.25rem' } : { transform: 'translateX(0)' }
                    }
                ></div>
                <div className="h-1 w-8 z-10 dark:bg-white bg-black transition"
                    style={
                        !open ? { transform: 'rotate(45deg)', width: '1.68rem' } : { transform: 'rotate(0)' }
                    }
                ></div>
            </div>

            <div className="fixed w-full h-screen dark:bg-gray-900 bg-white top-0 left-0 z-0 transition"
                style={
                    !open ? { transform: 'translateX(0)' } : { transform: 'translateX(100%)' }
                }
            >
                <div className="flex flex-col justify-center items-center gap-4 h-full dark:text-white text-[20px]">
                    <a href="/Home">Home</a>
                    <a href="/About">About</a>
                    <a href="/Contact">Contact</a>
                    <a href="/Login">Login</a>
                </div>
            </div>
        </div>
    );
}