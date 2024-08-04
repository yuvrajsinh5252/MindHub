export const middleware = async (request: Request, set: any) => {
  const accesToken1 = request.headers.get("Authorization");
  const accesToken2 = request.url.split("access_token=")[1];

  if (accesToken1 || accesToken2 || request.url.includes("getAccessToken"))
    return;
  else set({ status: 401, body: { error: "Unauthorized" } });
};
