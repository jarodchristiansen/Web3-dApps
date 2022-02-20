pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";



contract PriceConsumerV3 {

   AggregatorV3Interface internal priceFeed;

   /**
    * Network: Rinkeby
    * Aggregator: ETH/USD
    * Address: 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
    */
   constructor() public {
       priceFeed = AggregatorV3Interface(0x10900f50d1bC46b4Ed796C50A4Cc63791CaF7501);
   }

   /**
    * Returns the latest price
    */
   function getLatestPrice() public view returns (int) {
       (
           uint80 roundID,
           int price,
           uint startedAt,
           uint timeStamp,
           uint80 answeredInRound
       ) = priceFeed.latestRoundData();
       return price;
   }

   function getTimestamp() public view returns (uint) {
              (
           uint80 roundID,
           int price,
           uint startedAt,
           uint timeStamp,
           uint80 answeredInRound
       ) = priceFeed.latestRoundData();
       return timeStamp;
   }
}
