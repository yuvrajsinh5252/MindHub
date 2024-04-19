import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { getAccessToken, githubAuth } from "./routes/auth";
import {
  createUser,
  getCreatorCourse,
  getRole,
  getViewerCourse,
  setRole,
  uploadCourse,
} from "./routes/neonDB";

const app = new Elysia()
  .use(cors())
  .group("/auth", (group) => {
    return group
      .get("/getUser", ({ request }) => githubAuth(request.headers))
      .get("/getAccessToken", ({ query }) => getAccessToken(query));
  })

  .group("/db", (group) => {
    return group
      .post("/createUser", ({ set, body }) => createUser(set, body))
      .post("/setRole", ({ body }) => setRole(body))
      .post("/getRole", ({ body }) => getRole(body))
      .post("/uploadCourse", ({ set, body }) => uploadCourse(set, body))
      .post("/getCreatorCourse", ({ body }) => getCreatorCourse(body))
      .post("/getViewerCourse", () => getViewerCourse());
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
