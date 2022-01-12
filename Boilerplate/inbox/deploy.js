// deploy code will go here
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');


const provider = new HDWalletProvider(
  'close can behind feed purchase predict great awful million sweet bundle off',
  'https://rinkeby.infura.io/v3/ffd852d39a8745b095fc17ff55ca9891'
);

const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from acct', accounts[0]);


    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hi there!']})
        .send({gas: '1000000', from: accounts[0]});

    console.log('Contract deployed to', result.options.address);
};
deploy();