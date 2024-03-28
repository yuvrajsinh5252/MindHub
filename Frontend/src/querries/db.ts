import { createQuery } from "react-query-kit";
import axios from "../api/axios";

interface UploadProps {
  formData: FormData;
  type: string;
}

export async function getUserData() {
  return axios.get("/auth/getUser", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
}

export const handleUpload = async (uploadData: UploadProps) => {
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
};

export const useGithubUser = createQuery({
  queryKey: ["user"],
  fetcher: getUserData,
});

export const useUploadVideo = createQuery({
  queryKey: ["upload"],
  fetcher: handleUpload,
});
