// import { Ocean, DataTokens } from '@oceanprotocol/lib';
// import { OceanFixedRateExchange } from '@oceanprotocol/lib/dist/node/exchange/FixedRateExchange';
// import { LoggerInstance, LogLevel } from '@oceanprotocol/lib/dist/node/utils';
import store from '../store/store';
let Ocean = '';
let DataTokens = '';
let OceanFixedRateExchange = '';
let LoggerInstance = '';
let LogLevel = '';
let Web3 = '';
let factory = '';
let datatokensTemplate = '';
let fixedRateExchangeJSON = '';
const fixedRateExchangeAddress = '0xeD1DfC5F3a589CfC4E8B91C1fbfC18FC6699Fbde';
let fixedRateExchangeAbi = fixedRateExchangeJSON.abi;
const oceanAddress = '0x8967BCF84170c91B0d24D4302C2376283b0B3a07';

async function loadLibrary() {
  const obj = await import('@oceanprotocol/lib').then(module => {
    const { Ocean, DataTokens } = module;
    return { Ocean, DataTokens };
  });
  console.log(obj);
  Ocean = obj.Ocean;
  DataTokens = obj.DataTokens;
  OceanFixedRateExchange = await import(
    '@oceanprotocol/lib/dist/node/exchange/FixedRateExchange'
  ).then(module => {
    const { OceanFixedRateExchange } = module;
    return OceanFixedRateExchange;
  });
  const logObj = await import('@oceanprotocol/lib/dist/node/utils').then(
    module => {
      const { LoggerInstance, LogLevel } = module;
      return { LoggerInstance, LogLevel };
    }
  );
  LoggerInstance = logObj.LoggerInstance;
  LogLevel = logObj.LogLevel;
  Web3 = require('web3');
  factory = require('@oceanprotocol/contracts/artifacts/DTFactory.json');
  datatokensTemplate = require('@oceanprotocol/contracts/artifacts/DataTokenTemplate.json');
  fixedRateExchangeJSON = require('@oceanprotocol/contracts/artifacts/FixedRateExchange.json');
  fixedRateExchangeAbi = fixedRateExchangeJSON.abi;
}

let ocean;
let web3;
let fixedRateExchange;
let datatoken;
let rate;
let did;

async function connectToOceanMarketPlace(provider) {
  // console.log(DataTokens)
  await loadLibrary();
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
}

async function publishContent(author, metadata) {
  // await connectToOceanMarketPlace(provider);
  try {
    let stepNumber = 1;
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
    console.log(dataTokenAddress);
    // move to next step
    stepNumber++;
    store.commit('SET_CURRENT_TRANSACTION_STEP', stepNumber);

    console.log('created datatoken');

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
    let ddo;
    try {
      ddo = await ocean.assets.create(
        asset,
        alice,
        [service1],
        dataTokenAddress
      );
      console.log({ DDO: ddo, DID: ddo.id });
      did = ddo.id;
    } catch (err) {
      console.log('error at create assets');
      throw err;
    }
    // move to next step
    stepNumber++;
    store.commit('SET_CURRENT_TRANSACTION_STEP', stepNumber);

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

    // move to next step
    stepNumber++;
    store.commit('SET_CURRENT_TRANSACTION_STEP', stepNumber);

    // Alice allow market place to sell her datatokens
    await datatoken.approve(
      dataTokenAddress,
      fixedRateExchangeAddress, // FixedRateExchangeAddress,
      '50', // marketplaceAllowance
      alice.getId()
    );

    // move to next step
    stepNumber++;
    store.commit('SET_CURRENT_TRANSACTION_STEP', stepNumber);

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
    // move to next step
    stepNumber++;
    store.commit('SET_CURRENT_TRANSACTION_STEP', stepNumber);

    return { did, exchangeId, dataTokenAddress };
  } catch (err) {
    console.log('error catched at OceanMarket.js');
    throw err;
  }
}
async function isDownloadable(datatokenAddress, accountAddress) {
  var tokenInstance = new web3.eth.Contract(
    datatokensTemplate.abi,
    datatokenAddress
  );
  const res = await tokenInstance.methods.balanceOf(accountAddress).call();
  return parseInt(res) > 0;
}
function loadMetadata() {
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
}
async function getPrice(exchangeId) {
  loadMetadata();
  console.log('getPrice function working');
  var oceanNeeded = await fixedRateExchange.getRate(exchangeId);
  console.log('ocean Needed: ', oceanNeeded);
  return oceanNeeded;
}
async function buyContent(exchangeId) {
  loadMetadata();
  console.log({ Buying: exchangeId });
  var bob = (await ocean.accounts.list())[0];
  let stepNumber = 1;
  try {
    const txId = await datatoken.approve(
      oceanAddress,
      fixedRateExchangeAddress,
      '10',
      bob.getId()
    );
    console.log('txId: ', txId);
    // move to next step
    stepNumber++;
    store.commit('SET_CURRENT_TRANSACTION_STEP', stepNumber);

    const swapResult = await fixedRateExchange.buyDT(
      exchangeId,
      '1',
      bob.getId()
    );
    if (swapResult) {
      // move to next step
      stepNumber++;
      store.commit('SET_CURRENT_TRANSACTION_STEP', stepNumber);
    } else {
      throw new Error({ code: -3206, message: 'Null value' });
    }
  } catch (err) {
    console.log('error catched at OceanMarket.js');
    throw err;
  }
}
async function downloadContent(DID, dta) {
  var bob = (await ocean.accounts.list())[0];
  let stepNumber = 1;
  try {
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
    stepNumber++;
    store.commit('SET_CURRENT_TRANSACTION_STEP', stepNumber);
  } catch (err) {
    console.log('error in download OceanMarket.js');
    throw err;
  }
}

export {
  connectToOceanMarketPlace,
  publishContent,
  buyContent,
  downloadContent,
  isDownloadable,
  getPrice
};
