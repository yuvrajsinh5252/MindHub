const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// github authentication part->

// getting the user from the access token
export async function githubAuth(headers: any) {
  const Authorization = headers.get("Authorization");

  try {
    return await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        Authorization: Authorization,
      },
    }).then((response: any) => {
      return response.json();
    });
  } catch (error) {
    console.log(error);
  }
}

// getting the access token from the code
export async function getAccessToken(query: any) {
  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    query.code;
  try {
    return await fetch("https://github.com/login/oauth/access_token" + params, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }).then((response: any) => {
      return response.json();
    });
  } catch (error) {
    console.log(error);
  }
}
