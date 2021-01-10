import { Ocean, DataTokens, Logger } from '@oceanprotocol/lib';
import { OceanFixedRateExchange } from '@oceanprotocol/lib/dist/node/exchange/FixedRateExchange';
import { LoggerInstance, LogLevel } from '@oceanprotocol/lib/dist/node/utils';

const Web3 = require('web3');
const factory = require('@oceanprotocol/contracts/artifacts/DTFactory.json');
const datatokensTemplate = require('@oceanprotocol/contracts/artifacts/DataTokenTemplate.json');
const fixedRateExchangeJSON = require('@oceanprotocol/contracts/artifacts/FixedRateExchange.json');
const fixedRateExchangeAddress = '0xeD1DfC5F3a589CfC4E8B91C1fbfC18FC6699Fbde';
const fixedRateExchangeAbi = fixedRateExchangeJSON.abi;
const oceanAddress = '0x8967BCF84170c91B0d24D4302C2376283b0B3a07';

let ocean;
let web3;
let fixedRateExchange;
let datatoken;
let rate;
let did;

async function connectToOceanMarketPlace(provider) {
  // console.log(DataTokens)

  web3 = new Web3(provider);
  const config = {
    network: 'rinkeby',
    metadataCacheUri: 'https://aquarius.rinkeby.oceanprotocol.com',
    providerUri: 'https://provider.rinkeby.oceanprotocol.com',
    nodeUri: 'https://rinkeby.infura.io/v3/c5a798dfd7184a27990ed8744003cc61',
    verbose: LogLevel.Error,
    web3Provider: web3,
    factoryAddress: '0x3fd7A00106038Fb5c802c6d63fa7147Fe429E83a',
    metadataContractAddress: '0xFD8a7b6297153397B7eb4356C47dbd381d58bFF4'
  };
  ocean = await Ocean.getInstance(config);
  datatoken = new DataTokens(
    ocean.config.factoryAddress,
    factory.abi,
    datatokensTemplate.abi,
    web3
  );
  fixedRateExchange = new OceanFixedRateExchange(
    web3,
    LoggerInstance,
    fixedRateExchangeAddress,
    fixedRateExchangeAbi,
    oceanAddress,
    datatoken
  );
  // console.log({ connectToOceanMarketPlace: ocean });
  // Here for testing only, will be called from action.js
  // await publishContent();
}

async function publishContent(author, metadata) {
  // await connectToOceanMarketPlace(provider);
  var alice = (await ocean.accounts.list())[0];
  console.log({ alice, address: alice.getId() });
  datatoken = new DataTokens(
    ocean.config.factoryAddress,
    factory.abi,
    datatokensTemplate.abi,
    web3
  );
  const data = { t: 1, url: ocean.config.metadataCacheUri };
  const blob = JSON.stringify(data);
  console.log('creating datatoken address');
  const dataTokenAddress = await datatoken.create(blob, alice.getId());
  // const dataTokenAddress = "0x751d4EE1D7C18eE3F74D65f57B9C6110c61F1f40"
  // console.log(dataTokenAddress);

  var asset = {
    main: {
      type: 'dataset',
      name: metadata.title,
      dateCreated: new Date(Date.now()).toISOString().split('.')[0] + 'Z',
      author: author,
      license: 'MIT',
      files: [
        {
          url: metadata.url,
          checksum: 'efb2c764274b745f5fc37f97c6b0e761',
          contentLength: '4535431',
          contentType: 'text/csv',
          encoding: 'UTF-8',
          compression: 'zip'
        }
      ]
    }
  };
  const service1 = await ocean.assets.createAccessServiceAttributes(
    alice,
    1,
    new Date(Date.now()).toISOString().split('.')[0] + 'Z',
    0
  );

  const ddo = await ocean.assets.create(
    asset,
    alice,
    [service1],
    dataTokenAddress
  );
  console.log({ DDO: ddo, DID: ddo.id });

  // to be returned
  did = ddo.id;

  fixedRateExchange = new OceanFixedRateExchange(
    web3,
    LoggerInstance,
    fixedRateExchangeAddress,
    fixedRateExchangeAbi,
    oceanAddress,
    datatoken
  );
  // minting
  await datatoken.mint(dataTokenAddress, alice.getId(), '100');

  // Alice allow market place to sell her datatokens
  await datatoken.approve(
    dataTokenAddress,
    fixedRateExchangeAddress, // FixedRateExchangeAddress,
    '50', // marketplaceAllowance
    alice.getId()
  );

  // await datatoken.allowance(
  //   dataTokenAddress,
  //   alice,
  //   fixedRateExchangeAddress,
  // )

  rate = '10';

  const tx = await fixedRateExchange.create(
    dataTokenAddress,
    rate,
    alice.getId()
  );
  const exchangeId = tx.events.ExchangeCreated.returnValues[0];
  console.log('exchange id: ', exchangeId);

  return { did, exchangeId, dataTokenAddress };
  // var fixedRateExchangeContract = new web3.eth.Contract(fixedRateExchangeJSON.abi, fixedRateExchangeAddress)
  // console.log(fixedRateExchangeContract)

  // fixedRateExchangeContract.methods.create("0x8967BCF84170c91B0d24D4302C2376283b0B3a07", dataTokenAddress, web3.utils.toWei(rate)).send({from: alice.getId()}).then(res => {
  //   console.log("create: ", res)

  //   fixedRateExchangeContract.methods.generateExchangeId("0x8967BCF84170c91B0d24D4302C2376283b0B3a07", dataTokenAddress, alice.getId()).call({from: alice.getId()}).then(res => {
  //     console.log("Exchange ID: ", res)
  //     fixedExchangeId = res
  //     fixedRateExchangeContract.methods.getRate(fixedExchangeId).call({from: alice.getId()}).then(res => {
  //       console.log("rate", res)
  //     })

  //     fixedRateExchangeContract.methods.getSupply(fixedExchangeId).call({from: alice.getId()}).then(res => {
  //       console.log("supply", res)
  //     })

  //   })

  // })

  // ocean.fixedRateExchange.create(datatoken, "1", "0x8967BCF84170c91B0d24D4302C2376283b0B3a07", "10").then(res => {
  //     console.log(res)
  // })
  // ocean.pool
  //   const marketplace = (await ocean.accounts.list())[1];

  //   const asset1 = await ocean.assets.resolve(ddo.id);
  //   const accessService = await ocean.assets.getServiceByType(asset1.id, 'access');
  //   const price = 20; // in USD per dataToken
  //   assert(accessService.attributes.main.cost * price === 200);
}

async function buyContent(exchangeId) {
  console.log({ 'Buying': exchangeId });
  var bob = (await ocean.accounts.list())[0];
  const txId = await datatoken.approve(
    oceanAddress,
    fixedRateExchangeAddress,
    '10',
    bob.getId()
  );
  console.log('txId: ', txId);
  const swapResult = await fixedRateExchange.buyDT(
    exchangeId,
    '1',
    bob.getId()
  );
  console.log(swapResult);
}
async function downloadContent(DID, dta) {
  var bob = (await ocean.accounts.list())[0];
  const accessService = await ocean.assets.getServiceByType(DID, 'access');
  console.log(accessService);

  await ocean.assets
    .order(DID, accessService.type, bob.getId())
    .then(async tx => {
      console.log('tx=>', tx);
      if (tx) {
        await ocean.assets.download(DID, tx, dta, bob, '');
      }
    });
}

export {
  connectToOceanMarketPlace,
  publishContent,
  buyContent,
  downloadContent
};
