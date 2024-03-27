import useAuth from "@/hook/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading, error } = useAuth();

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
        loading ? (
          <div className="flex justify-center items-center">
            <div className="lg:pt-20">
              <div className="text-black">
                Authecating please wait a moment...
              </div>
            </div>
          </div>
        ) : isAuthenticated ? (
          <div>
            {children}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div className="lg:pt-20">
              <div className="text-red-500">User not authenticated</div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ProtectedRoute;
