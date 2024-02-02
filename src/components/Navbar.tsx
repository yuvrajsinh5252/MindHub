import { useEffect, useState } from "react";
import Hamburger from "./Hamburger";

export default function Navbar() {
    const [user, setUser] = useState<any>();

    function loginWithGithub() {
        const CLIENT_ID = process.env.REACT_APP_ID;
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
    }

    function logout() {
        localStorage.removeItem("access_token");
    }

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const code = query.get("code");

        if (code && (localStorage.getItem("access_token") == null)) {
            const getAccessToken = async () => {
                await fetch("http://localhost:8080/getAccessToken?code=" + code, {
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
    }, []);

    useEffect(() => {
        async function getUser() {
            const accessToken = localStorage.getItem("access_token");
            if (accessToken) {
                await fetch("http://localhost:8080/getUser?access_token=" + accessToken, {
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
    }, []);

    return (
        <nav>
            <div className="bg-blue-200 w-full h-16 fixed top-0">
                <div>
                    <div className="flex justify-around max-sm:justify-between max-sm:mx-10 items-center h-16">
                        <h1 className="font-bold text-gray-700 text-xl">MindHub</h1>
                        <div className="max-sm:hidden w-[300px] flex items-center">
                            <a href="/Home" className="w-full text-center hover:border-b-2 mx-2 border-gray-400">Home</a>
                            <a href="/About" className="w-full text-center hover:border-b-2 mx-2 border-gray-400">About</a>
                            <a href="/Contact" className="w-full text-center hover:border-b-2 mx-2 border-gray-400">Contact</a>
                            <a onClick={loginWithGithub}>{
                                !user ? (
                                    <div className="w-full text-center hover:border-b-2 mx-2 border-gray-400">
                                        login
                                    </div>
                                ) : (
                                    <div className="w-10 mx-2">
                                        <img className="rounded-full m-auto" src={user.avatar_url} alt="" />
                                    </div>
                                )
                            }</a>
                        </div>
                        <Hamburger />
                    </div>
                </div>
            </div>
        </nav>
    )
}