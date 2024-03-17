import useAuth from "../hooks/useAuth";
import Roles from "./roles";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading, error, isRole } = useAuth();

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
            <div>{children}</div>
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
