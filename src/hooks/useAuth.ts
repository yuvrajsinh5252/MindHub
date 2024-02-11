import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
        await fetch("http://localhost:8081/getAccessToken?code=" + code, {
            method: "GET",
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.access_token) {
                localStorage.setItem("access_token", data.access_token);
            }
        })
    }

    async function getUser() {
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
            const user = await fetch("http://localhost:8081/getUser?access_token=" + accessToken, {
                method: "GET",
                headers: {
                    "Authorization": "token " + accessToken,
                }
            }).then((response) => {
                return response.json();
            })

            if (user) {
                setIsAuthenticated(true);
                setUser(user);
            }
            return user;
        }

        return null;
    }

    const handleCallback = async (code: string) => {
        const access_token = localStorage.getItem("access_token");
        if (code && (access_token == null)) await getAccessToken(code);

        const user = await getUser();
        if (user) {
            await fetch("http://localhost:8081/createUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: user.id,
                    username: user.login,
                }),
            }).then((response) => {
                return response.json();
            });
            setIsAuthenticated(true);
            setUser(user);
        }

        setLoading(false);
    };

    useEffect(() => {
        const code = new URLSearchParams(search).get('code');
        if (code) handleCallback(code);
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