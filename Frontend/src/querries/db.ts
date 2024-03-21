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

export async function getRole() {
  const user = await getUserData();
  return await axios.post("/db/getRole", { id: user.data.id });
}

export const handleUpload = async (uploadData: UploadProps) => {
  try {
    await axios.post("/db/uploadVideo", uploadData.formData);
  } catch (error) {
    console.log("Error uploading file", error);
  }
};
