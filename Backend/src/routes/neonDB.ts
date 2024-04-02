import { eq } from "drizzle-orm";
import db from "../db";
import { File, creator, users, viewer } from "../db/schema";

interface file {
  secure_url: string;
  original_filename: string;
  resource_type: string;
  bytes: number;
}

export const createUser = async (set: any, body: any) => {
  const { id, username } = body;

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

      return newUser.rows[0];
    }
  } catch (error) {
    console.log(error);
    set.status(500);
    return "Something went wrong while creating user";
  }
};

export const uploadVideo = async (set: any, body: any) => {
  const type = body.file.type;
  const creatorID = body.userId;

  const formdata = new FormData();
  formdata.append("file", body.file);
  formdata.append("upload_preset", body.upload_preset);

  let cloudName: string = "dp6puihqw";
  let resourceType: string = type == "video/mp4" ? "video" : "image";
  let url: string = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const response = await fetch(url, {
    method: "POST",
    body: formdata,
  }).then((res) => res.json());

  const { secure_url, original_filename, resource_type, bytes }: file =
    response;

  console.log("secure_url: ", secure_url);

  try {
    await db.insert(File).values({
      creatorID: creatorID,
      name: original_filename,
      type: resource_type,
      url: secure_url,
      size: bytes,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.log(error);
    set.status(500);
    return "Something went wrong while uploading file";
  }

  console.log("file uploaded");

  const file = await db
    .select()
    .from(File)
    .where(eq(File.name, original_filename));

  console.log("file: ", file);

  return secure_url;
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
