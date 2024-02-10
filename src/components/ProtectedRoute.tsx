import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = (
    {children} : {children: React.ReactNode}
) => {
    const {isAuthenticated,loading} = useAuth();

    return (
        <div>
            {
                loading ? (
                    <div>Authenticating user please wait a moment.....</div>
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