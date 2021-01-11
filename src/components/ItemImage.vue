<template>
  <div
    class="relative flex items-center justify-center h-32 mx-auto w-36 lg:w-32 xl:w-36">
    <img
      class="absolute top-0 left-0 z-0 object-contain w-full h-full"
      :src="blueprintBackground"
      v-if="image.isBlueprint">
    <img
      class="absolute top-0 left-0 z-0 object-contain w-full h-full"
      :src="blueprintForeground"
      v-if="image.isBlueprint">
    <img
      class="relative z-10 h-auto"
      :class="{
        'w-1/2': image.isBlueprint,
        'w-full': !image.isBlueprint,
      }"
      :src="image.src"
      alt="">
    <div
      v-if="image.isFallback"
      class="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full opacity-50">
      <span class="text-4xl text-yellow-300">?</span>
    </div>
  </div>
</template>

<script>
import { getImage } from "../services/item-image";
export default {
  props: [
    'item'
  ],
  data () {
    return {
      publicPath: process.env.BASE_URL
    }
  },
  computed: {
    image () {
      return getImage(this.item.id, this.item.text)
    },
    blueprintBackground () {
      return require(`./../assets/items/blueprint_background.png`)
    },
    blueprintForeground () {
      return require(`./../assets/items/blueprint_foreground.png`)
    },
    rigLevelImage () {
      const level = this.image.rigLevel
      if (level) {
        return require(`./../assets/items/120000${level}.png`)
      }
      return null
    },
  },
}
</script>

<style>

</style>
