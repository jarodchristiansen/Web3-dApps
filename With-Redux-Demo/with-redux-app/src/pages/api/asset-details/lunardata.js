import axios from "axios";
var cache = require("memory-cache");

export default async (req, res) => {
  // `https://api.lunarcrush.com/v2?data=assets&key=${key}&symbol=${id}&data_points=${time}&interval=day`,

  let key = req.query.key;
  let id = req.query.symbol;
  let time = parseInt(req.query.time);

  let testData = cache.get(`lunarData: ${id}`);

  let data;
  if (testData) {
    data = testData;
    console.log("testDta is there, setting from cache");
  } else {
    data = await fetch(
      `https://api.lunarcrush.com/v2?data=assets&key=${key}&symbol=${id}&data_points=${time}&interval=day`
    ).then((response) => response.json());

    //Hits this area if the value is no longer in the cache to prevent the data from being hit too frequently. currently 12 hours as it is on a daily UI
    cache.put(`lunarData: ${id}`, data, 43200000, function (key, value) {
      console.log(key + " did " + value);
    });
  }

  res.json({ data: data });

  // if (assetCollection) {
  //   if (time) {
  //     let uniswap = await assetCollection.find({}).limit(time).toArray();
  //
  //     res.json(uniswap);
  //   }
  //   console.log("time is not defined", time);
  //   // res.json({data: assetCollection})
  // } else {
  //   res.status(400).json("no assetCollection");
  // }
};
