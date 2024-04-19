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

export const useUserRole = createQuery<data, Variables>({
  queryKey: ["getrole"],
  fetcher: (variables: Variables) => getRole(variables.id),
});

export const useSetRole = createMutation<data, setRoleVariables>({
  mutationFn: (variables) => setRole(variables.id, variables.role),
});

export const useCreatorCourse = createQuery<data, Variables>({
  queryKey: ["creatorCourse"],
  fetcher: (variables: Variables) => getCreatorCourse(variables.id),
});

export const useViewerCourse = createQuery<data, void>({
  queryKey: ["viewerCourse"],
  fetcher: getViewerCourse,
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

export async function uploadCourse(uploadData: FormData) {
  try {
    const data = await axios.post("/db/uploadCourse", uploadData, {
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

export async function getCreatorCourse(id: number) {
  return axios.post("/db/getCreatorCourse", {
    id: id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
}

export async function getViewerCourse() {
  return axios.post("/db/getViewerCourse", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
}
