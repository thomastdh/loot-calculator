<template>
  <div class="bg-gray-400 bg-opacity-50">
    <item-header :item="item" />
    <div class="relative flex items-center justify-center h-32 pl-4">
      <div class="absolute top-0 left-0 p-1">
        <button type="button"
          tabindex="-1"
          class="p-1 bg-black bg-opacity-0 rounded-full cursor-move handle hover:bg-opacity-20 hover:ring-2 hover:ring-black">
          <svg
            class="w-3 h-3"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div class="absolute top-0 right-0 p-1">
        <button
          @click="onRemove"
          type="button"
          tabindex="-1"
          class="p-1 hover:bg-red-800 hover:text-white hover:bg-opacity-30">
          <svg
            class="w-3 h-3"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <item-image :item="item" />
    </div>
    <div
      class="relative z-10 flex items-center justify-between px-2 py-1 -mt-4 text-sm">
      <div class="flex items-center">
        <span class="inline-block">x</span>
        <input
          type="text"
          :value="item.qty"
          @input="onChangeQty"
          class="inline-block w-8 h-5 p-1 ml-1 text-xs text-white bg-black qty-input focus:outline-none focus:ring-2 focus:ring-gray-800 bg-opacity-30">
      </div>
      <item-price
        class="flex flex-col items-end"
        :show-time-ago="true"
        :is-editable="true"
        :item="item" />
    </div>
  </div>
</template>

<script>
import { getImage } from "../services/item-image";
import { usePriceDisplay } from "./hooks/HasPrice";
import { useItemRanking } from "./hooks/ItemRanking";
import store from "./../store";
import ItemImage from "./ItemImage.vue";
import ItemHeader from "./ItemHeader.vue";
import ItemPrice from "./ItemPrice.vue";
export default {
  props: [
    'item'
  ],
  components: {
    ItemImage,
    ItemHeader,
    ItemPrice,
  },
  setup (props) {
    const { price, priceDisplay, hasPrice, isPriceLoading } = usePriceDisplay(props)
    const { isNamed, isFactionGreen, isFactionBlue } = useItemRanking(props);
    return {
      price,
      priceDisplay,
      hasPrice,
      isPriceLoading,
      isNamed,
      isFactionGreen,
      isFactionBlue,
    }
  },
  data () {
    return {
      publicPath: process.env.BASE_URL
    }
  },
  computed: {
    image () {
      return getImage(this.item.id, this.item.text)
    },
  },
  methods: {
    onRemove () {
      store.commit('removeItem', {
        id: this.item.id
      })
    },
    onChangeQty (e) {
      store.commit('setItemQuantity', {
        id: this.item.id,
        qty: e.target.value
      })
    },
  }
}
</script>
