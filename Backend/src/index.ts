import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { getAccessToken, githubAuth } from "./routes/auth";
import { createUser } from "./routes/neonDB";

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
      .post("/uploadVideo", async ({ body }) => {
        console.log(body);

        let cloudName: string = "dp6puihqw";
        let resourceType: string = "image";
        let url: string = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
        });
        response.json();
        console.log(response);
      });
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
