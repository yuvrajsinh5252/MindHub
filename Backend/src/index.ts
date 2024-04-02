import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { getAccessToken, githubAuth } from "./routes/auth";
import { createUser, getRole, setRole, uploadVideo } from "./routes/neonDB";

const app = new Elysia()
  .use(cors())
  .group("/auth", (group) => {
    return group
      .get("/getUser", ({ request }) => githubAuth(request.headers))
      .get("/getAccessToken", ({ query }) => getAccessToken(query));
  })

  .group("/db", (group) => {
    return group
      .post("/createUser", ({ set, request }) => createUser(set, request))
      .post("/setRole", ({ body }) => setRole(body))
      .post("/getRole", ({ body }) => getRole(body))
      .post("/uploadVideo", ({ set, body }) => uploadVideo(set, body));
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
