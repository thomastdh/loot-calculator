<template>
<div class="w-full min-h-screen bg-black bg-cover main-bg">
  <navigation />
  <div class="px-8 pb-12 mx-auto max-w-7xl ">
    <app-main/>
  </div>
</div>
</template>

<script>
import Navigation from "./components/Nav.vue";
import AppMain from "./components/Main.vue";
export default {
  name: 'App',
  components: {
    Navigation,
    AppMain,
  }
}
</script>

<style scoped>
.main-bg {
  background-image: url('./assets/main_bg.jpg');
}
</style>
