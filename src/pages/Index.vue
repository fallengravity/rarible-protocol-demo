<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
      @click="test"
    >
  </q-page>
</template>

<script>

export default {
  name: 'PageIndex',
  mounted() {
    this.init();
  },
  data() {
    return {};
  },
  methods: {
    async init() {
      await this.$API.onboard.walletSelect();
      await this.$API.onboard.walletCheck();
      console.log(this.$API.web3);
    },
    async test() {
      const accounts = await this.$API.web3.eth.getAccounts();
      const address = accounts[0];
      console.log(address);
    },
  },
};
</script>
