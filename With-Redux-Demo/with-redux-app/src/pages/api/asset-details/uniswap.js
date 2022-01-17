import { MongoClient, ObjectId } from 'mongodb';



export default async (req, res) => {


    let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

    let id = req.query.id
    let time = parseInt(req.query.time)

    if (id === "BTC") {
        id = "WBTC"
    }


    console.log("this is time in uniswap endpoint----", time, typeof time)

    const db = client.db('Crypto_Watch');
    let assetCollection = await db.collection(`Uniswap_Volume_Sum.${id}Volume`)

    if(assetCollection) {
        if (time) {
            let uniswap = await assetCollection.find({}).limit(time).toArray()

            res.json(uniswap)
        }
            console.log("time is not defined", time)
        // res.json({data: assetCollection})
    } else {
        res.status(400).json("no assetCollection")
    }
    // console.log('this is db', db)
    // if (asset-details) {
    //     res.json(asset-details)
    // } else {
    //     res.json('')
    // }



    // if (db) {
    //     let uniswap = await db.collection(`OMGVolume`)
    //         .find({})
    //         .toArray();
    //
    //
    //     console.log("this is uniswap", uniswap)
    //     res.json('would be uniswap');
    //
    //
    //
    //     const assets = await db.collection("Crypto_Assets")
    //         .find({})
    //         .sort((a, b) => a.id - b.id)
    //         .limit(20)
    //         .toArray();
    //     // res.json(assets);
    //
    //
    //     console.log("this is db", db, "this is assetCollection", assetCollection)
    //     console.log('assets----', assets)
    //     console.log('uniswap-----', uniswap)
    //
    // } else {
    //     console.log("no db")
    //     res.json('')
    // }

};
