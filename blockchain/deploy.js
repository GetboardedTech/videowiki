const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const createVideo = require('./build/CreateVideo.json');

const provider = new HDWalletProvider(
  'unusual intact income soldier episode daughter when lamp blind apple twin august',
  'https://rinkeby.infura.io/v3/072795b8234f421581d4acedfacb3b9c'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(createVideo.interface))
    .deploy({ data: '0x' + createVideo.bytecode }) // add bytecode
    .send({ from: accounts[0] }); // remove gas

  console.log('Contract deployed to', result.options.address);
};
deploy();

//0x46366a740909CfF5DAf8c9B12d56Ab423BaD8Fa8