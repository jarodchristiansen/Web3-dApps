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
  const favorite = req.body.data;

  let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

  const db = client.db("Crypto_Watch");

  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  console.log("this is the user", user);

  if (!user) {
    res.status(400).json({ message: "User not found." });
    client.close();
    return;
  }

  const currentFavorites = user.favorites;
  let favoritesHolder = [];

  if (containsObject(favorite, currentFavorites)) {
    favoritesHolder = [...currentFavorites];
    res.status(402).json({ message: "already in favorites" });
  } else if (currentFavorites?.length > 0) {
    favoritesHolder = [...currentFavorites, favorite];
  } else {
    favoritesHolder = [favorite];
  }

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { favorites: favoritesHolder } }
  );

  client.close();
  res.status(200).json({ message: "Favorite Added" });
}

function containsObject(obj, list) {
  console.log("running containsObject --", obj);
  for (let i = 0; i < list?.length; i++) {
    if (list[i]?.symbol === obj?.symbol) {
      console.log("found obj in list", obj.symbol);
      return true;
    }
  }
  console.log("didnt find obj in list");
  return false;
}

export default handler;
