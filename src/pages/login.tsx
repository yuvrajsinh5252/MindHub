import { handleGitHubLogin, handleGoogleLogin } from "../components/auth";

export default function Login() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="bg-gray-300 flex justify-around p-2 items-center rounded-md w-96 h-40 flex-col">
                <div className="bg-white w-full p-1 rounded-md">
                    <button
                        onClick={handleGitHubLogin}
                        className="w-full flex items-center gap-6"
                    >
                        <img
                            className="w-12 h-12"
                            src="/Assets/github_logo.png" alt="github" />
                        Github Login</button>
                </div>
                <div className="bg-white w-full p-1 rounded-md">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center gap-6"
                    >
                        <img
                            className="w-12 h-12"
                            src="/Assets/google_logo.png" alt="google" />
                        Google Login</button>
                </div>
            </div>
        </div>
    )
}