import { eq } from "drizzle-orm";
import db from "../db";
import { users } from "../db/schema";

export const createUser = async (req: any, res: any) => {
  const { id, username } = req.body;

  if (!id || !username) return res.status(400).json("Invalid input");

  try {
    // first check if user already exists
    const user = await db.select().from(users).where(eq(users.id, id));

    if (user.length > 0) return res.json("User already exists");
    else {
      const newUser = await db.insert(users).values({name: username, id: id});

      console.log("user created");
      res.json(newUser.rows[0]);
    }
  } catch (error) {
    console.log(error);
  }
};