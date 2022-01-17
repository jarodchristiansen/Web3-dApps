import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x3f3650553F7660CA5d1ef3f10c44bE76A4a39A80"
);

export default instance;
