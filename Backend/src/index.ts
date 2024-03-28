import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { getAccessToken, githubAuth } from "./routes/auth";
import { createUser } from "./routes/neonDB";

const app = new Elysia()
  .use(cors())
  .group("/auth", (group) => {
    return group
      .get("getUser", ({ request }) => githubAuth(request.headers))
      .get("getAccessToken", ({ query }) => getAccessToken(query));
  })

  .group("/db", (group) => {
    return group
      .post("createUser", ({ set, request }) => createUser(set, request))
      .get("uploadVideo", () => "Hello, uploadvideo!");
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
