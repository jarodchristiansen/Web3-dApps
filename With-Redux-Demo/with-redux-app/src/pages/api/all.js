// import dbConnect from "../../lib/dbConnect";
// import Crypto_Asset from '../../models/asset';
//
// export default async function handler(req, res) {
//     const { method } = req
//
//  await dbConnect()
//
//     switch (method) {
//         case 'GET':
//             try {
//                 const Crypto_Assets = await Crypto_Asset.find({}) /* find all the data in our database */
//                 console.log("this is CryptoAssets", Crypto_Assets)
//                 res.status(200).json({ success: true, data: Crypto_Assets })
//             } catch (error) {
//                 res.status(400).json({ success: false })
//             }
//             break
//         case 'POST':
//             try {
//                 const pet = await Pet.create(
//                     req.body
//                 ) /* create a new model in the database */
//                 res.status(201).json({ success: true, data: pet })
//             } catch (error) {
//                 res.status(400).json({ success: false })
//             }
//             break
//         default:
//             res.status(400).json({ success: false })
//             break
//     }
// }

import { MongoClient } from "mongodb";

export default async (req, res) => {
  let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

  const db = client.db();
  let assetCollection = db.collection("Crypto_Assets");

  // console.log('this is db', db)
  // if (asset-details) {
  //     res.json(asset-details)
  // } else {
  //     res.json('')
  // }

  //
  // try {
  //     await client.connect();
  // } catch (error) {
  //     res.status(500).json({ message: 'Could not connect to database.' });
  //     return;
  // }

  // console.log("this is client", client)
  // // const { db } = await connectToDatabase();
  // const { db } = client.db();
  //
  if (db) {
    const assets = await db
      .collection("Crypto_Assets")
      .find({})
      .sort({ id: 1 })
      .limit(20)
      .toArray();
    // console.log(
    //   "id",
    //   typeof assets[0].id,
    //   "title",
    //   typeof assets[0].title,
    //   "symbol",
    //   typeof assets[0].symbol,
    //   "description",
    //   typeof assets[0].description,
    //   "imageUrl",
    //   typeof assets[0].imageUrl,
    //   "category",
    //   typeof assets[0].category,
    //   "tags",
    //   typeof assets[0].tags,
    //   "urls",
    //   typeof assets[0].urls,
    //   "size",
    //   typeof assets[0].size
    // );

    client.close();
    res.json(assets);
  } else {
    console.log("no db");
    res.json("");
  }
};
