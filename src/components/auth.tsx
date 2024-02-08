import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const handleGitHubLogin = async () => {
    const CLIENT_ID = process.env.REACT_APP_ID;
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
};

export const handleGoogleLogin = async () => {
    const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;
    window.location.assign("https://accounts.google.com/o/oauth2/v2/auth?client_id=" + CLIENT_ID + "&redirect_uri=http://localhost:3000&response_type=token&scope=https://www.googleapis.com/auth/userinfo.profile");
}

const Auth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [render, setRender] = useState(false);
    const navigation = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        setIsAuthenticated(false);
    }

    const handleCallback = async (code: string) => {
        if (code && (localStorage.getItem("access_token") == null)) {
            const getAccessToken = async () => {
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
            getAccessToken();
        }

        async function getUser() {
            const accessToken = localStorage.getItem("access_token");
            if (accessToken) {
                await fetch("http://localhost:8081/getUser?access_token=" + accessToken, {
                    method: "GET",
                    headers: {
                        "Authorization": "token " + accessToken,
                    }
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    setUser(data);
                })
            }
        }

        getUser();
        setRender(!render);
    };

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) handleCallback(code);
    }, []);

    useEffect(() => {
        if (user) {
            setIsAuthenticated(true);
            setRender(!render);
        }
    }, [user]);

    // ... handle logout and protected routes

    return (
        <div>
            {
                isAuthenticated ? (
                    <div className='mx-2 flex justify-center flex-col items-center w-full'>
                        <img
                            className='w-10 h-10 rounded-full'
                            src={user.avatar_url}
                            alt={user.login} />
                        <h2>{user.login}</h2>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <button
                    className='w-full text-center hover:border-b-2 mx-2 border-gray-400'
                    onClick={() => navigation("/login")}>Login</button>
                )
            }
        </div>
    )
};

export default Auth;