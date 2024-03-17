import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Roles from "./roles";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading, error, isRole } = useAuth();
  const [path, setPath] = useState<string>("/");

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  const userPath = ["/dashboard", "/profile", "/courses", "/creater-studio"]
  const createrPath = ["/creater-studio"]

  console.log(isRole);

  const checkRole = () => {
    if (isRole === "user") {
      if (createrPath.includes(path)) {
        return false
      }
    } else {
      if (userPath.includes(path)) {
        return false
      }
    }
    return true
  }

  const correctPath = checkRole();

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
      {/* check if it is loading then check the role of user and then is the user authenticated or not */}
      {
        loading ? (
          <div className="flex justify-center items-center pt-20">
            Authenticating please wait a moment...
          </div>
        ) :
          (isAuthenticated ? (!isRole ? (
            <Roles />
          ) : (
            correctPath ? (
              <div>{children}</div>
            ) : (<div>
                  Looks like you are not authorized to access this page
                </div>
            )
          )
          ) : (
            <div>
              <div className="flex justify-center flex-col gap-5 items-center pt-20">
                <div className="text-red-500">
                  You are not authorized to access this page
                </div>
                <button
                  onClick={() => {
                    window.location.assign("/login");
                  }}
                  className="bg-gray-800 text-white px-4 py-2 rounded-md ml-4"
                >
                  Back to login
                </button>
              </div>
            </div>
          ))
      }
    </div>
  );
};

export default ProtectedRoute;
