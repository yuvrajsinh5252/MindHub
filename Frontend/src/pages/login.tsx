import { Button, buttonVariants } from "../components/ui/button";
import { handleGitHubLogin } from "../hooks/useAuth";

export default function Login() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="border-2 flex flex-col gap-6 rounded-lg w-[400px] max-sm:w-72">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center p-2">
                        <img src="/Assets/logo.png" alt="logo"
                            className="w-32 h-32"
                        />
                    </div>
                    <h1 className="font-bold text-xl">MindHub</h1>
                </div>
                <div className="flex flex-col gap-2 p-2 rounded-lg">
                    <p className="text-center pb-2 text-lg font-semibold">
                        Welcome back!
                    </p>
                    <Button
                        className={buttonVariants({ variant: "secondary", size: "lg" })}
                        onClick={handleGitHubLogin}
                    >
                        <img
                            className="w-11 h-9 pr-1"
                            src="/Assets/github_logo.png" alt="github" />
                        <p className="text-lg">Login with Github</p>
                    </Button>
                </div>
            </div>
        </div>
    )
}