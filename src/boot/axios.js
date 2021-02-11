/* eslint-disable no-console */
import Vue from 'vue';
import axios from 'axios';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Portis from '@portis/web3';
import Fortmatic from 'fortmatic';

const API = {};

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
  cacheProvider: true, // optional
  providerOptions, // required
});
const provider = web3Modal.connect();
const web3 = new Web3(provider);

API.Web3 = web3;
API.Provider = provider;

Vue.prototype.$axios = axios;
Vue.prototype.$API = API;
