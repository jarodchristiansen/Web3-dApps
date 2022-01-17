import { MongoClient } from "mongodb";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { email, password, username } = data;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          "invalid input - password should also be at least 7 characters long.",
      });

      return;
    }

    const client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "User exists already!" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
      username: username,
    });

    res.status(201).json({ message: "Created user!" });
  } else {
    return;
  }
}

export default handler;
