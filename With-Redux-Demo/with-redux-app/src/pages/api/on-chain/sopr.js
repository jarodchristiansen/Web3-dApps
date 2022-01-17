import dbConnect from "../../../lib/dbConnect";
// import Crypto_Asset from "../../../models/asset";

// export default async function handler(req, res) {
//   const { method } = req;
//
//   let connection = await dbConnect();
//
//   console.log("this is the connection -----", connection);
//
//   switch (method) {
//     case "GET":
//       try {
//         const users = await Crypto_Asset.find({});
//         res.status(200).json(users);
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;
//     case "POST":
//       try {
//         const user = await Crypto_Asset.create(req.body);
//         res.status(201).json({ success: true, data: user });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;
//     default:
//       res.status(400).json({ success: false });
//       break;
//   }
// }

// import { MongoClient, ObjectId } from 'mongodb';
//
//
//
// export default async (req, res) => {
//
//
//     let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);
//
//
//     const db = client.db('Crypto_Watch');
//     let sopr = await db.collection(`BTC_SOPR`)
//
//     let placeholderArray = []
//
//     if (sopr) {
//         // if (time) {
//         //     let uniswap = await assetCollection.find({}).limit(time).toArray()
//         //
//         //     res.json(uniswap)
//         // }
//         let data = await sopr.find({}).toArray();
//
//
//         for (let i=0; i <= data.length; i++) {
//             if (i % 7 === 0) {
//                 placeholderArray.push(data[i])
//             }
//         }
//
//
//         console.log("this is the weekly sopr data", placeholderArray)
//
//         res.json(placeholderArray)
//
//         // res.json({data: assetCollection})
//     } else {
//         res.status(400).json("no assetCollection")
//     }
// };
