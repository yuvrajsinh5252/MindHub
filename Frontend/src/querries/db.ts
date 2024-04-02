import { createMutation, createQuery } from "react-query-kit";
import axios from "../api/axios";

type Variables = { id: number };
type data = any;
type setRoleVariables = {
  id: number;
  role: string;
};

export const useGithubUser = createQuery({
  queryKey: ["user"],
  fetcher: getUserData,
});

export const useUploadVideo = createQuery({
  queryKey: ["upload"],
  fetcher: handleUpload,
});

export const useUserRole = createQuery<data, Variables>({
  queryKey: ["getrole"],
  fetcher: (variables: Variables) => getRole(variables.id),
});

export const useSetRole = createMutation<data, setRoleVariables>({
  mutationFn: (variables) => setRole(variables.id, variables.role),
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

export async function setRole(id: number, role: string) {
  return axios.post("/db/setRole", {
    id: id,
    role: role,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
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
