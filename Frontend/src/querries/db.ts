import axios from "../api/axios";

export async function getUserData() {
    return axios.get("/auth/getUser", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token"),
        },
    });
}

export async function getRole(id: number) {
    return axios.post("/db/getRole", { id: id });
}