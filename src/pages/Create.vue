<template>
  <q-page>
    <div>
      <q-card dark bordered class="bg-grey-9 my-card" style="margin: 2%;">
      <q-card-section>
        <div class="text-h6 text-center">Create an NFT</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <q-file outlined v-model="file">
        <template v-slot:append>
          <q-icon name="attach_file" />
        </template>
      </q-file>
      <br>
      <q-input outlined v-model="itemName" label="NFT Name" />
      <br>
      <q-input outlined v-model="itemAmount" label="NFT Name" />
      <br>
      <q-input v-model="itemDesc" filled type="textarea" />
      <br>
      <q-btn color="black" label="Create NFT" class="full-width text-center" @click="create" />
      </q-card-section>
    </q-card>
    </div>
  </q-page>
</template>

<script>
import abi from 'assets/abi.json';

export default {
  name: 'PageIndex',
  data() {
    return {
      file: null,
      itemName: '',
      itemDesc: '',
      itemAmount: 10,
    };
  },
  mounted() {},
  methods: {
    async create() {
      this.$axios.get('https://api-ropsten.rarible.com/tokens/0x71B053bCaF286Ba20D9006845412D4532A8E1f34/nonce').then((result) => {
        const collection = new this.$API.web3.eth.Contract(abi, '0x71B053bCaF286Ba20D9006845412D4532A8E1f34');
        console.log(result.data, collection);
        const formData = new FormData();
        formData.append('file', this.file);
        this.$axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
          maxContentLength: 'Infinity',
          headers: {
            'Content-Type': 'multipart/form-data;',
            pinata_api_key: 'be3bfa92ab28f891bd50',
            pinata_secret_api_key: 'd3e7a10b25359f14409563ed2a88cacf130c585abebef234797027a428b89194',
          },
        }).then((response) => {
          // eslint-disable-next-line no-new-object
          const data = new Object();
          data.name = this.itemName;
          data.description = this.itemDesc;
          data.image = `ipfs://ipfs/${response.data.IpfsHash}`;
          data.external_url = `https://app.rarible.com/0x71B053bCaF286Ba20D9006845412D4532A8E1f34/${result.data.value}`;
          this.$axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', data, {
            maxContentLength: 'Infinity',
            headers: {
              'Content-Type': 'application/json',
              pinata_api_key: 'be3bfa92ab28f891bd50',
              pinata_secret_api_key: 'd3e7a10b25359f14409563ed2a88cacf130c585abebef234797027a428b89194',
            },
          }).then((metadata) => {
            const add = this.$API.web3.utils.toChecksumAddress('0x6C1AaC9EAd0a2c0D328309fbb2cf940F49d26126');
            const value = this.$API.web3.eth.abi.encodeParameter('uint256', 100);
            const tokenURI = this.$API.web3.eth.abi.encodeParameter('string', `https://ipfs.daonomic.com/ipfs/${metadata.data.IpfsHash}`);
            const supply = this.$API.web3.eth.abi.encodeParameter('uint256', this.itemAmount);
            const recipient = this.$API.web3.eth.abi.encodeParameter('address', add);
            const inputs = this.$API.web3.eth.abi.encodeFunctionCall({
              constant: false,
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'id',
                  type: 'uint256',
                },
                {
                  internalType: 'uint8',
                  name: 'v',
                  type: 'uint8',
                },
                {
                  internalType: 'bytes32',
                  name: 'r',
                  type: 'bytes32',
                },
                {
                  internalType: 'bytes32',
                  name: 's',
                  type: 'bytes32',
                },
                {
                  components: [
                    {
                      internalType: 'address payable',
                      name: 'recipient',
                      type: 'address',
                    },
                    {
                      internalType: 'uint256',
                      name: 'value',
                      type: 'uint256',
                    },
                  ],
                  internalType: 'struct ERC1155Base.Fee[]',
                  name: 'fees',
                  type: 'tuple[]',
                },
                {
                  internalType: 'uint256',
                  name: 'supply',
                  type: 'uint256',
                },
                {
                  internalType: 'string',
                  name: 'uri',
                  type: 'string',
                },
              ],
              name: 'mint',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            }, [result.data.value, result.data.v, result.data.r, result.data.s, [[[recipient], [value]]], supply, tokenURI]);
            const accounts = this.$API.web3.eth.getAccounts();
            collection.methods.mint(inputs).send({
              from: accounts[0],
            });
          }).catch((error) => {
            console.log(error);
          });
        }).catch((error) => {
          console.log(error);
        });
      });
    },
  },
};
</script>
