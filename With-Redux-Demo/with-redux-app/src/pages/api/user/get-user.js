import { getSession } from "next-auth/client";
import { MongoClient } from "mongodb";
import { hashPassword, verifyPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "GET") {
    console.log("not a get request");
    return;
  }

  const session = await getSession({ req });

  // if (!session) {
  //   res.status(401).json({ message: "Not authenticated" });
  //   return;
  // }

  let userName = req.query.user;

  // const userEmail = session.user.email;

  let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

  const db = client.db("Crypto_Watch");

  const usersCollection = db.collection("users");

  const user = await usersCollection?.findOne({ username: userName });

  if (!user) {
    res.status(400).json({ message: "User not found." });
    client.close();
    return;
  }

  if (user) {
    let userCopy = JSON.parse(JSON.stringify(user));

    delete userCopy["password"];
    delete userCopy["_id"];
    delete userCopy["email"];

    res.status(200).json(userCopy);
    return;
  }
  client.close();
}

export default handler;
