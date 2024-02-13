import axios from "../api/axios";

export async function getUserData() {
    return axios.get("/auth/getUser", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token"),
        },
    });
}