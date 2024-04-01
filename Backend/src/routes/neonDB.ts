import { eq } from "drizzle-orm";
import db from "../db";
import { creator, users, viewer } from "../db/schema";

export const createUser = async (set: any, request: Request) => {
  const { id, username } = await request.json();

  if (!id || !username) {
    set.status(400);
    return "Invalid input";
  }

  try {
    // first check if user already exists
    const user = await db.select().from(users).where(eq(users.id, id));
    if (user.length > 0) return "User already exists";
    else {
      const newUser = await db.insert(users).values({
        id: id,
        name: username,
      });
      console.log("user created");
      return newUser.rows[0];
    }
  } catch (error) {
    console.log(error);
    set.status(500);
    return "Something went wrong while creating user";
  }
};

export const uploadVideo = async (body: any) => {
  const type = body.file.type;

  const formdata = new FormData();
  formdata.append("file", body.file);
  formdata.append("upload_preset", body.upload_preset);

  let cloudName: string = "dp6puihqw";
  let resourceType: string = type == "video/mp4" ? "video" : "image";
  let url: string = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const response = await fetch(url, {
    method: "POST",
    body: formdata,
  });
  response.json();
  console.log(response);
};

export const setRole = async (body: any) => {
  const { id, role } = body;

  try {
    const user = await db.select().from(users).where(eq(users.id, id));

    if (user.length == 0) return "User not found";
    else {
      if (role == "creator") {
        const typeCreator = await db.insert(creator).values({ id: id });
        return typeCreator.rows[0];
      } else if (role == "user") {
        const typeViewer = await db.insert(viewer).values({ id: id });
        return typeViewer.rows[0];
      }
    }
  } catch (error) {
    console.log(error);
    return "Something went wrong while updating user role";
  }
};

export const getRole = async (body: any) => {
  // console.log(body);

  try {
    const creatorRole = await db
      .select()
      .from(creator)
      .where(eq(creator.id, body.id));
    if (creatorRole.length > 0) return "creator";
    else return "viewer";
  } catch (error) {
    console.log(error);
    return "Something went wrong while fetching user role";
  }
};
