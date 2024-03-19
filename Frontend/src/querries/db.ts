import axios from "../api/axios";

interface UploadProps {
    img: File | null;
    video: File | null;
    type: string;
}

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

export const handleUpload = async (uploadData: UploadProps) => {
    const { img, video, type } = uploadData;

    const formData = new FormData();
    formData.append("file", type === "image" ? img as File : video as File);
    formData.append("upload_preset", type === "image" ? "image_preset" : "videos_preset");

    try {
        let cloudName: string = "dp6puihqw";
        let resourceType: string = type === "image" ? "image" : "video";
        let url: string = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

        const response = await axios.post(url, formData, {
            headers: {'Application': undefined}
        });
        const { secure_url } = response.data;
        return {secure_url, type};
    } catch (error) {
        console.log("Error uploading file", error);
    }
}

export const setUrl = async ({url, id} : {
    url: string,
    id: number
}) => {
    return axios.post("/db/creator/setUrl", { url, id });
}

export const getUrl = async (id: number) => {
    return axios.post("/db/creator/getUrl", { id });
}