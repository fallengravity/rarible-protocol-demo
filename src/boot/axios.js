/* eslint-disable no-console */
import Vue from 'vue';
import axios from 'axios';
import Onboard from 'bnc-onboard';
import Web3 from 'web3';

const API = {};
const apiKey = '0ee58158-e48f-492b-b7df-92554915a6b3';
const networkId = 1;
const FORTMATIC_KEY = 'pk_live_61EC2B200F4216C6';
const PORTIS_KEY = '924889fa-9818-473f-8ceb-a86b7248d5c5';
const INFURA_KEY = 'ad2ee80801ce45de9dd717e612c904cb';
const APP_URL = 'https://nftly.net';
const CONTACT_EMAIL = 'ethan@rarible.com';
const RPC_URL = 'https://mainnet.infura.io/v3/ad2ee80801ce45de9dd717e612c904cb';
const APP_NAME = 'Rarible Protocol';
const wallets = [
  { walletName: 'coinbase', preferred: true },
  { walletName: 'trust', preferred: true, rpcUrl: RPC_URL },
  { walletName: 'metamask', preferred: true },
  { walletName: 'authereum' },
  {
    walletName: 'trezor',
    appUrl: APP_URL,
    email: CONTACT_EMAIL,
    rpcUrl: RPC_URL,
  },
  {
    walletName: 'ledger',
    rpcUrl: RPC_URL,
  },
  {
    walletName: 'lattice',
    rpcUrl: RPC_URL,
    appName: APP_NAME,
  },
  {
    walletName: 'fortmatic',
    apiKey: FORTMATIC_KEY,
    preferred: true,
  },
  {
    walletName: 'portis',
    apiKey: PORTIS_KEY,
    preferred: true,
    label: 'Login with Email',
  },
  {
    walletName: 'walletConnect',
    infuraKey: INFURA_KEY,
  },
  { walletName: 'opera' },
  { walletName: 'operaTouch' },
  { walletName: 'torus' },
  { walletName: 'status' },
  { walletName: 'walletLink', rpcUrl: RPC_URL, appName: APP_NAME },
  { walletName: 'imToken', rpcUrl: RPC_URL },
  { walletName: 'meetone' },
  { walletName: 'mykey', rpcUrl: RPC_URL },
  { walletName: 'huobiwallet', rpcUrl: RPC_URL },
  { walletName: 'hyperpay' },
  { walletName: 'wallet.io', rpcUrl: RPC_URL },
  { walletName: 'atoken' },
];

let web3;

const onboard = Onboard({
  dappId: apiKey,
  networkId,
  darkMode: true,
  subscriptions: {
    wallet: (wallet) => {
      web3 = new Web3(wallet.provider);
      API.web3 = web3;
    },
  },
  walletSelect: {
    wallets,
  },
});

console.log(onboard);
API.onboard = onboard;

Vue.prototype.$axios = axios;
Vue.prototype.$API = API;

/*
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Portis from '@portis/web3';
import Fortmatic from 'fortmatic';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: 'https://mainnet.infura.io/v3/ad2ee80801ce45de9dd717e612c904cb', // required
    },
  },
  fortmatic: {
    package: Fortmatic, // required
    options: {
      key: 'pk_live_61EC2B200F4216C6', // required
    },
  },
  portis: {
    package: Portis, // required
    options: {
      id: '924889fa-9818-473f-8ceb-a86b7248d5c5', // required
    },
  },
};

const web3Modal = new Web3Modal({
  network: 'mainnet', // optional
  cacheProvider: false, // optional
  disableInjectedProvider: true,
  providerOptions, // required
});

const provider = web3Modal.connect();
const web3 = new Web3(provider);
console.log(web3); */
