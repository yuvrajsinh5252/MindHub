import useAuth from "@/hook/useAuth";
import { useSetRole } from "@/querries/db";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Roles({ setCurrentStep, currentStep }: {
    setCurrentStep: any,
    currentStep: number
}) {
    const [role, setRole] = useState("");
    const { user } = useAuth();
    const mutateRole = useSetRole({
        onSettled: () => {
            setCurrentStep(currentStep + 1);
        }
    });

    return (
        <div className="flex justify-center rounded-md w-full flex-col gap-8 p-8">
            <div className="flex flex-col">
                <div className="flex gap-3 w-22 items-center">
                    <input
                        type="radio" id="user" name="role" value="user"
                        className="w-4 h-4 rounded-full appearance-none border border-gray-300 bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-0"
                        onChange={(e) => setRole(e.target.value)}
                    />
                    <label className="font-semibold text-xl" htmlFor="user">User</label>
                </div>
                <p className="text-sm text-gray-500 ml-7 dark:text-slate-200">Explore and discover new content</p>
            </div>
            <div className="flex flex-col">
                <div className="flex gap-3 w-22 items-center">
                    <input
                        type="radio" id="creator" name="role" value="creator"
                        className="w-4 h-4 rounded-full appearance-none border border-gray-300 bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-0"
                        onChange={(e) => setRole(e.target.value)}
                    />
                    <label className="font-semibold text-xl" htmlFor="creator">Creator</label>
                </div>
                <p className="text-sm text-gray-500 ml-7 dark:text-slate-200">Create and share your own content</p>
            </div>

            <Button
                onClick={() => {
                    if (role) mutateRole.mutate({ id: user.id, role: role });
                }}
                disabled={mutateRole.isPending}
            >
                {mutateRole.isPending ? "Setting..." : "Set Role"}
            </ Button>
        </div >
    )
}