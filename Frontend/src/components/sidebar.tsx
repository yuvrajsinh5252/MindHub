import { buttonVariants } from "./ui/button";

export default function Sidebar() {
    return (
        <div className="w-full">
            <div className="flex font-semibold text-xl justify-center items-start pt-5 h-[15%]">
                MindHub
            </div>
            <div className="flex flex-col gap-5 items-center p-4">
                <div className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                })}
                >Dashboard</div>
                <div className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                })}
                >Dashboard</div>
                <div className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                })}
                >Dashboard</div>
                <div className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                })}
                >Dashboard</div>
            </div>
        </div>
    )
}