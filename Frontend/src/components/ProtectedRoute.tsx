import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Loader2 } from "lucide-react";
const ProtectedRoute = (
    {children} : {children: React.ReactNode}
) => {
    const {isAuthenticated,loading, error} = useAuth();

    return (
        <div className="flex justify-center items-center">
            {
                loading ? (
                    <div className="flex gap-5 pt-20">
                        Authenticating user please wait a moment...
                        <Loader2 className="animate-spin" />
                    </div>
                ) : (
                    isAuthenticated ? (
                        <div>{children}</div>
                    ) : (
                        <Navigate to="/login"/>
                    )
                )
            }
        </div>
    )
}

export default ProtectedRoute;