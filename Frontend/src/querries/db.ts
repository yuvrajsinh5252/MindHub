import { createQuery } from "react-query-kit";
import axios from "../api/axios";

type Variables = { id: number };
type data = any;

export const useGithubUser = createQuery({
  queryKey: ["user"],
  fetcher: getUserData,
});

export const useUploadVideo = createQuery({
  queryKey: ["upload"],
  fetcher: handleUpload,
});

export const useUserRole = createQuery<data, Variables>({
  queryKey: ["role"],
  fetcher: (variables: Variables) => getRole(variables.id),
});

export async function getUserData() {
  return axios.get("/auth/getUser", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
}

export async function getRole(id: number) {
  return axios
    .post("/db/getRole", {
      id: id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      return res;
    });
}

export async function handleUpload(uploadData: FormData) {
  try {
    const data = await axios.post("/db/uploadVideo", uploadData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log(data);
  } catch (error) {
    console.log("Error uploading file", error);
  }
}
