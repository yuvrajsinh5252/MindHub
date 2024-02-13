const Pool = require("../db");

export const createUser = async (req: any, res: any) => {
  const { id, username } = req.body;

  if (!id || !username) return res.status(400).json("Invalid input");

  try {
    // first check if user already exists
    const user = await Pool.query("SELECT * FROM user_data WHERE id = $1", [id]);
    if (user.rows.length > 0) return res.json("User already exists");
    else {
      const newUser = await Pool.query(
        "INSERT INTO user_data (id, username) VALUES ($1, $2) RETURNING *",
        [id, username]
      );

      console.log("user created");
      res.json(newUser.rows[0]);
    }
  } catch (error) {
    console.log(error);
  }
};