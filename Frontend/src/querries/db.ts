import { createQuery } from "react-query-kit";
import axios from "../api/axios";

interface UploadProps {
  formData: FormData;
}

export const useGithubUser = createQuery({
  queryKey: ["user"],
  fetcher: getUserData,
});

export const useUploadVideo = createQuery({
  queryKey: ["upload"],
  fetcher: handleUpload,
});

type Variables = { id: number };
type data = { role: string };

export const useUserRole = createQuery<data, Variables>({
  queryKey: ["role"],
  fetcher: (variables) => getRole(variables.id),
});

export async function getUserData() {
  return axios.get("/auth/getUser", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
}

export async function getRole(id: number) {
  console.log("id", id);
  return axios
    .post("/db/getRole", {
      id: id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      return res.data;
    });
}

export async function handleUpload(uploadData: UploadProps) {
  try {
    await axios.post("/db/uploadVideo", uploadData.formData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  } catch (error) {
    console.log("Error uploading file", error);
  }
}
