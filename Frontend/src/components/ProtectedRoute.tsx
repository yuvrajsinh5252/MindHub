import useAuth from "@/hook/useAuth";
import { Button, buttonVariants } from "./ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useUserRole } from "@/querries/db";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading, error, user } = useAuth();
  const navigate = useNavigate();
  const { data: role, isLoading } = useUserRole({ variables: { id: user?.id }, enabled: !!user?.id });

  const path = window.location.pathname;
  const viewerPath = ["/dashboard", "/browsecourses", "/Mycourses"];
  const studioPath = ["/courses"];

  if ((viewerPath.includes(path) && role?.data === "creator") || (studioPath.includes(path) && role?.data === "viewer")) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="text-destructive">You are not authorized to access this page</div>
          {
            role?.data === "creator" ? (
              <Button
                className={buttonVariants({
                  size: "sm",
                  variant: "secondary",
                })}
                onClick={() => navigate({ to: "/courses" })}> Go to creator studio </Button>
            ) : (
              <Button
                className={buttonVariants({
                  size: "sm",
                  variant: "secondary",
                })}
                onClick={() => navigate({ to: "/dashboard" })}> Go to dashboard </Button>
            )
          }
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center text-destructive-foreground">{error}</div>
    );
  }


  return (
    <div>
      {
        loading || isLoading ? (
          <div className="h-screen flex justify-center items-center">Authecating please wait a moment...</div>
        ) : isAuthenticated ? (
          !role ? (
            <div className="flex justify-center items-center">
              <div className="text-destructive-foreground">Select your role to proceed further</div>
              <Button
                className={buttonVariants({
                  size: "sm",
                  variant: "secondary",
                })}
                onClick={() => navigate({ to: "/onboarding" })}> set role </Button>
            </div>
          ) : (
            <div>
              {children}
            </div>
          )) : (
          <div className="flex h-screen justify-center items-center text-destructive-foreground">User not authenticated</div >
        )
      }
    </div >
  );
};

export default ProtectedRoute;
