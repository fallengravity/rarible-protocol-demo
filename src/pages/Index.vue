<template>
  <q-page>
    <div>
      <q-img :src="cover" style="max-height: 260px;"></q-img>
      <div style="text-align: center; z-index: 100; margin-top: -6%">
        <q-avatar style="height: 140px; width: 140px;">
          <img :src="image" style="height: 140px; width: 140px;">
        </q-avatar>
        <h4>
          {{ name }}
          <q-tooltip>
            {{ profileWallet }}
          </q-tooltip>
        </h4>
        <h4>{{ description }}</h4>
        <q-btn-group spread style="margin-right: 10%; margin-left: 10%">
          <q-btn color="green"> Followers: {{ followers }} </q-btn>
          <q-btn color="purple"> Following: {{ following }}</q-btn>
        </q-btn-group>
        <h4>Account Status: {{ badges[0] }}</h4>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageIndex',
  mounted() {
    this.init();
  },
  data() {
    return {
      profileWallet: 'Loading',
      blacklisted: false,
      cover: 'Loading',
      description: 'Loading',
      followers: 10000,
      following: 10000,
      image: 'Loading',
      badges: [],
      name: 'Loading',
    };
  },
  methods: {
    async init() {
      await this.$API.onboard.walletSelect();
      await this.$API.onboard.walletCheck();
      this.getProfile();
    },
    async getProfile() {
      const accounts = await this.$API.web3.eth.getAccounts();
      const address = accounts[0];
      this.$axios.get(`https://api-mainnet.rarible.com/profiles/${address}`).then((result) => {
        console.log(result.data);
        this.profileWallet = result.data.id;
        this.name = result.data.name;
        this.blacklisted = result.data.blacklisted;
        this.cover = `https://cloudflare-ipfs.com/${result.data.cover.substring(7)}`;
        this.description = result.data.description;
        this.followers = result.data.followers;
        this.following = result.data.followings;
        this.image = `https://cloudflare-ipfs.com/${result.data.image.substring(7)}`;
        this.badges = result.data.badges;
      });
    },
  },
};
</script>
