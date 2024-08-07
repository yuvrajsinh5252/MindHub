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

export const useFileViewer = createQuery<data, { id: string }>({
  queryKey: ["fileViewer"],
  fetcher: (variables: { id: string }) => getCourseFile(variables.id),
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
    .post("/db/getRole?access_token=" + localStorage.getItem("access_token"), {
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
  return axios.post(
    "/db/setRole?access_token=" + localStorage.getItem("access_token"),
    {
      id: id,
      role: role,
    }
  );
}

export async function uploadCourse(uploadData: FormData) {
  try {
    const data = await axios.post(
      "/db/uploadCourse?access_token=" + localStorage.getItem("access_token"),
      uploadData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(data);
  } catch (error) {
    console.log("Error uploading file", error);
  }
}

export async function getCreatorCourse(id: number) {
  return await axios.post(
    "/db/getCreatorCourse?access_token=" + localStorage.getItem("access_token"),
    {
      id: id,
    }
  );
}

export async function getViewerCourse() {
  return axios.post(
    "/db/getViewerCourse?access_token=" + localStorage.getItem("access_token")
  );
}

export async function getCourseFile(id: string) {
  return axios.post(
    "/db/getCourseFile?access_token=" + localStorage.getItem("access_token"),
    {
      id: id,
    }
  );
}
