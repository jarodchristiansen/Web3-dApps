import { getSession } from "next-auth/client";
import { MongoClient } from "mongodb";
import { hashPassword, verifyPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

  const db = client.db("Crypto_Watch");

  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(400).json({ message: "User not found." });
    client.close();
    return;
  }
  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(422).json({ message: "invalid password." });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  console.log("this is ht result", result);
  client.close();
  res.status(200).json({ message: "Password updated" });
}

export default handler;
