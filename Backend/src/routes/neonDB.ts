import { eq } from "drizzle-orm";
import db from "../db";
import { File, creators, users, viewer } from "../db/schema";

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

export const setRole = async (body: any) => {
  const { id, role } = body;

  try {
    const user = await db.select().from(users).where(eq(users.id, id));

    if (user.length == 0) return "User not found";
    else {
      if (role == "creator") {
        const typeCreator = await db.insert(creators).values({ id: id });
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
      .from(creators)
      .where(eq(creators.id, body.id));

    const viewerRole = await db
      .select()
      .from(viewer)
      .where(eq(viewer.id, body.id));

    if (creatorRole.length > 0) return "creator";
    else if (viewerRole.length > 0) return "viewer";
    else return "not set yet";
  } catch (error) {
    console.log(error);
    return "Something went wrong while fetching user role";
  }
};

export const getCourseFile = async (body: any) => {
  const courseId = body.id;

  console.log(courseId);

  try {
    const courseFile = await db
      .select()
      .from(File)
      .where(eq(File.id, courseId));

    return courseFile;
  } catch (error) {
    console.log(error);
    return "Something went wrong while fetching course file";
  }
};
