<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  mounted() {
    console.log(this.$API.provider);
    // Undefined.
    this.$API.Provider.on('accountsChanged', (accounts) => {
      console.log(accounts);
    });
  },
};
</script>
