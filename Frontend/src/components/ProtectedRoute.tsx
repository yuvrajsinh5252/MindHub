import useAuth from "@/hook/useAuth";
import { Button, buttonVariants } from "./ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useUserRole } from "@/querries/db";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading, error, user } = useAuth();
  const navigate = useNavigate();
  const { data: role, isLoading } = useUserRole(user?.id);

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <div className="lg:pt-20">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }


  return (
    <div>
      {
        loading || isLoading ? (
          <div className="flex justify-center items-center">
            <div className="lg:pt-20">
              <div className="text-black">
                Authecating please wait a moment...
              </div>
            </div>
          </div>
        ) : isAuthenticated ? (
          !role ? (
            <div className="flex justify-center items-center">
              <div className="lg:pt-20 gap-5 flex justify-center flex-col">
                <div className="text-red-500">Select your role to proceed further</div>
                <Button
                  className={buttonVariants({
                    size: "sm",
                    variant: "secondary",
                  })}
                  onClick={() => navigate({ to: "/onboarding" })}> set role </Button>
              </div>
            </div>
          ) : (
            <div>
              {children}
            </div>
          )) : (
          <div className="flex justify-center items-center">
            <div className="lg:pt-20">
              <div className="text-red-500">User not authenticated</div>
            </div >
          </div >
        )
      }
    </div >
  );
};

export default ProtectedRoute;
