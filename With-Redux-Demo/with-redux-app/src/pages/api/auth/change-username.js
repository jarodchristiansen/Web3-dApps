import { getSession } from "next-auth/client";
import { MongoClient } from "mongodb";

async function handler(req, res) {

    console.log("change-username hit ------")

    if (req.method !== "PATCH") {
        return;
    }

    const session = await getSession({ req });

    if (!session) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }

    const userEmail = session.user.email;
    const newUsername = req.body.newUsername;

    let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

    const db = client.db("Crypto_Watch");

    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
        res.status(400).json({ message: "User not found." });
        client.close();
        return;
    }

    const result = await usersCollection.updateOne(
        { email: userEmail },
        { $set: { username: newUsername } }
    );

    session.user = {}

    console.log("new session after update--- ", session)

    client.close();
    res.status(200).json({ message: "Password updated" });


}

export default handler;
