<template>
<div class="w-full min-h-screen bg-black bg-cover main-bg">
  <navigation />
  <div class="pb-12 mx-auto md:px-8 max-w-7xl ">
    <router-view />
  </div>
</div>
</template>

<script>
import Navigation from "./components/Nav.vue";
export default {
  name: 'App',
  components: {
    Navigation,
  }
}
</script>

<style scoped>
.main-bg {
  background-image: url('./assets/main_bg.jpg');
}
</style>
