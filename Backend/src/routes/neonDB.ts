import { eq } from "drizzle-orm";
import db from "../db";
import { users } from "../db/schema";

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
