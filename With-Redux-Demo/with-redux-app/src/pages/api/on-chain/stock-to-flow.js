import { MongoClient, ObjectId } from 'mongodb';



export default async (req, res) => {


    let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);


    const db = client.db('Crypto_Watch');
    let s2f = await db.collection(`S2F`)

    if (s2f) {
        // if (time) {
        //     let uniswap = await assetCollection.find({}).limit(time).toArray()
        //
        //     res.json(uniswap)
        // }
        let data = await s2f.find({}).limit(4700).toArray();

        console.log("this is the stock to flow data", data)
        res.json(data)

        // res.json({data: assetCollection})
    } else {
        res.status(400).json("no assetCollection")
    }
};