export default function Home() {

    return (
        <div className="flex py-40 items-center flex-col gap-10 h-[calc(100vh-4rem)]">
            <div>
                <header className="text-lg bg-blue-300 p-1 px-5 rounded-full font-semibold text-zinc-800 shadow-lg">MindHub</header>
            </div>
            <div className="text-center font-extralight">
                <p>
                    The best place where you become a professional in your field and a great experience,
                </p>
                <p>
                    with the best teachers and the best students.
                </p>
            </div>
        </div>
    )
}