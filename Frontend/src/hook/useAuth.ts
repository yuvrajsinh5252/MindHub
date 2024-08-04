import axios from "@/api/axios";
import { useState, useEffect, useCallback } from "react";

export const handleGitHubLogin = async () => {
  const CLIENT_ID = import.meta.env.VITE_GITHUB_ID;
  window.location.assign(
    "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
  );
};

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const search = window.location.search;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.assign("http://localhost:5173");
    setIsAuthenticated(false);
  };

  async function getAccessToken(code: string) {
    const { data } = await axios.get("/auth/getAccessToken?code=" + code, {
      headers: {
        Accept: "application/json",
      },
    });

    if (data && data.access_token) {
      localStorage.setItem("access_token", data.access_token);
    } else {
      setError("Failed to get access token");
    }
  }

  const getUser = useCallback(async () => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      const { data } = await axios.get(
        "/auth/getUser?access_token=" + accessToken,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      if (data) {
        setIsAuthenticated(true);
        setLoading(false);
        setUser(data);
      }
      return data;
    }
  }, [setIsAuthenticated, setLoading, setUser]);

  const handleCallback = useCallback(
    async (code: string) => {
      const access_token = localStorage.getItem("access_token");
      if (code && access_token == null) await getAccessToken(code);

      const user = await getUser();
      if (user) {
        await axios.post("/db/createUser?access_token" + access_token, {
          id: user.id,
          username: user.login,
        });

        setIsAuthenticated(true);
        setUser(user);
      } else {
        setError("Failed to authenticate user, please try again.");
      }

      setLoading(false);
    },
    [getUser]
  );

  useEffect(() => {
    const code = new URLSearchParams(search).get("code");
    let access_token = localStorage.getItem("access_token");
    if (code) handleCallback(code);
    else if (access_token) getUser();
    else setLoading(false);
  }, [handleCallback, search, getUser]);

  return {
    isAuthenticated,
    handleCallback,
    handleGitHubLogin,
    handleLogout,
    user,
    loading,
    error,
  };
}
