import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "../components/ui/button";

export default function Home() {
    return (
        <div className="flex py-40 items-center flex-col gap-16 h-[calc(100vh-4rem)]">
            <div>
                <header className="text-lg bg-gray-600 p-1 px-5 rounded-full text-white shadow-xl">MindHub</header>
            </div>
            <div className="text-center flex flex-col gap-9">
                <div className="text-3xl max-sm:text-xl font-poppins font-semibold">
                    <p className="pb-1">
                        The best place to feel like professional,
                    </p>
                    <p>
                        while learning and growing.
                    </p>
                </div>
                <div>
                    <Button
                        className={buttonVariants({
                            variant: "default",
                        })}
                        onClick={() => window.location.assign("/login")}
                    >
                        <p className="text-base">Get Started</p>
                        <ArrowRight className="w-6 h-6" />
                    </Button>
                </div>
            </div>
        </div>
    )
}