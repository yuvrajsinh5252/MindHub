import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../api/axios';

export const handleGitHubLogin = async () => {
    const CLIENT_ID = process.env.REACT_APP_ID;
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
};

export const handleGoogleLogin = async () => {
    const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;
    window.location.assign("https://accounts.google.com/o/oauth2/v2/auth?client_id=" + CLIENT_ID + "&redirect_uri=http://localhost:3000&response_type=token&scope=https://www.googleapis.com/auth/userinfo.profile");
}

export default function useAuth () {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { search } = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        window.location.assign("http://localhost:3000");
        setIsAuthenticated(false);
    }

    async function getAccessToken(code: string) {
        const { data } = await axios.get("/auth/getAccessToken?code=" + code, {
            headers: {
                "Accept": "application/json",
            }
        });
        if (data && data.access_token) {
            localStorage.setItem("access_token", data.access_token);
        }
    }

    async function getUser() {
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
            const { data } = await axios.get("/auth/getUser?access_token=" + accessToken, {
                headers: {
                    "Authorization": "Bearer " + accessToken,
                }
            });
            if (data) {
                setIsAuthenticated(true);
                setLoading(false);
                setUser(data);
            }
            return data;
        }

        return null;
    }

    const handleCallback = async (code: string) => {
        const access_token = localStorage.getItem("access_token");
        if (code && (access_token == null)) await getAccessToken(code);

        const user = await getUser();
        if (user) {
            // await axios.post("/createUser", {
            //     id: user.id,
            //     username: user.login,
            // });

            setIsAuthenticated(true);
            setUser(user);
        }

        setLoading(false);
    };

    useEffect(() => {
        const code = new URLSearchParams(search).get('code');
        let access_token = localStorage.getItem("access_token");
        if (code) handleCallback(code);
        else if (access_token) getUser();
        else setLoading(false);
    }, []);

    return {
        isAuthenticated,
        handleCallback,
        handleGitHubLogin,
        handleGoogleLogin,
        handleLogout,
        user,
        loading,
    }
};