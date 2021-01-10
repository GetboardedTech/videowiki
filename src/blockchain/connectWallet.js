import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Torus from '@toruslabs/torus-embed';
import { connectToOceanMarketPlace, buyContent, publishContent } from './OceanMarket';

// Web3modal instance
let web3Modal;

// Chosen wallet provider given by the dialog window
let provider;

// Address of the selected account
let selectedAccount;

function init() {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: 'c5a798dfd7184a27990ed8744003cc61'
      }
    },
    torus: {
      package: Torus
    }
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false // optional. For MetaMask / Brave / Opera.
  });

  console.log('Web3Modal instance is', web3Modal);
}

async function fetchAccountData() {
  // Get a Web3 instance for the wallet
  const web3 = new Web3(provider);

  console.log('Web3 instance is', web3);

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  // MetaMask does not give you all accounts, only the selected account
  console.log('Got accounts', accounts);
  selectedAccount = accounts[0];
}
async function onConnect() {
  init();
  try {
    document.getElementById('WEB3_CONNECT_MODAL_ID').firstChild.style.zIndex = 300000;
    provider = await web3Modal.connect();
  } catch (e) {
    console.log('Could not get a wallet connection', e);
    return false;
  }
  // Subscribe to accounts change
  provider.on('accountsChanged', accounts => {
    fetchAccountData();
    connectToOceanMarketPlace(provider);
  });
  /* Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  }); */

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    fetchAccountData();
  });
  // await refreshAccountData();
  await connectToOceanMarketPlace(provider);
  // publishContent(provider)
  await fetchAccountData();
  return true;
}

async function onBuy() {
  buyContent(provider)
}

async function onDisconnect() {
  await web3Modal.clearCachedProvider();
  provider = null;
  selectedAccount = null;
}

export { onConnect, onDisconnect, onBuy };
