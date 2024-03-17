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
      const newUser = await db.insert(users).values({
        id: id,
        name: username,
        role: "not assigned",
      });

      console.log("user created");
      res.json(newUser.rows[0]);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRole = async (req: any, res: any) => {
  const { id } = req.body;

  try {
    const user = await db.select().from(users).where(eq(users.id, id));

    if (user.length > 0) {
      res.json(user[0].role);
    }
  } catch (error) {
    console.log(error);
  }
}

export const setRole = async (req: any, res: any) => {
  const { id, role } = req.body;

  try {
    const user = await db.update(users).set({ role: role }).where(eq(users.id, id));

    if (user) {
      res.json("User role updated");
    } else {
      res.json("User not found");
    }

    console.log("user role updated");
  } catch (error) {
    console.log(error);
  }
}