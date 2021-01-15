<template>
<div class="flex flex-col items-end p-1"
  :class="{
    'cursor-pointer hover:bg-gray-900 hover:bg-opacity-20': isEditable
  }"
  @click="onEditPrice">
  <div class="relative flex items-center text-right">
    <div v-if="!isPriceLoading">
      <span>{{ priceDisplay }}</span>
    </div>
    <div v-else>
      <span>---,---</span>
    </div>
    <svg
      class="w-3 h-3 text-white opacity-40 -mt-0.5"
      viewBox="0 0 255 255" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g>
              <path d="M201.401367,227 L210.776367,174.412109 L205.942383,173.533203 C200.766602,190.232422 194.833984,201.316406 188.144531,206.785156 C181.455078,212.253906 171.860352,214.988281 159.360352,214.988281 L159.360352,214.988281 L77.9150391,214.988281 L208.432617,28.3671875 L61.5087891,28.3671875 L57.4072266,78.0253906 L62.9736328,78.0253906 C65.0244141,66.1113281 67.2949219,57.9814453 69.7851562,53.6357422 C72.2753906,49.2900391 75.8886719,45.9697266 80.625,43.6748047 C85.3613281,41.3798828 93.0029297,40.2324219 103.549805,40.2324219 L103.549805,40.2324219 L167.124023,40.2324219 L39.6826172,221.580078 L39.6826172,227 L201.401367,227 Z" fill="currentColor" fill-rule="nonzero"></path>
              <line x1="57.25" y1="126.75" x2="197.75" y2="127.25" id="Line" stroke="currentColor" stroke-width="4" stroke-linecap="square"></line>
          </g>
      </g>
    </svg>
    <div v-if="price && price.isPriceEdited"
      class="absolute top-0 left-0 -ml-3">
      <svg
        class="w-3 h-3 text-yellow-400"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
  <div class="text-right text-gray-200 text-xxs"
    v-if="showTimeAgo">
    <div v-if="isPriceLoading">
      Checking price..
    </div>
    <div v-else-if="!price.hasMarketPrice"
      class="text-red-300">
      Missing market data
    </div>
    <div v-else-if="price"
      :class="{
        'text-green-500': price.status === 'PRICE_RECENT',
        'text-red-300': price.status === 'PRICE_STALE',
      }">
      <span v-if="Math.round(price.hoursAgo) <= 1">
        Less than an hour ago
      </span>
      <span v-else>
        From {{ price.hoursAgo.toFixed(0) }} hour{{Math.round(price.hoursAgo) !== 1 ? 's' : ''}} ago
      </span>
    </div>
  </div>
</div>
</template>

<script>
import { usePriceDisplay } from "./hooks/HasPrice";
export default {
  props: [
    'item',
    'showTimeAgo',
    'isEditable',
  ],
  setup (props) {
    const { price, priceDisplay, hasPrice, isPriceLoading } = usePriceDisplay(props)
    return {
      price,
      priceDisplay,
      hasPrice,
      isPriceLoading,
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    onEditPrice () {
      if (!this.isEditable) {
        return
      }
      this.$store.commit('setEditPrice', this.item.id)
    }
  }
}
</script>

<style scoped>
.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 32px 32px 0;
}
.triangle.named {
  border-color: transparent #047857 transparent transparent;
}
.triangle.faction-green {
  border-color: transparent #10B981 transparent transparent;
}
.triangle.faction-blue {
  border-color: transparent #60A5FA transparent transparent;
}
</style>
