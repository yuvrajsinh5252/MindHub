export const middleware = async (request: Request, set: any) => {
  const accesToken1 = request.headers.get("Authorization")?.split("Bearer ")[1];
  const accesToken2 = request.url.split("access_token=")[1];

  if (accesToken1 || accesToken2) return;
  // else return new Response("Unauthorized", { status: 404 });
};
