<template>
  <div class="bg-gray-400 bg-opacity-50"
    :class="{
      'opacity-20': !isLootActive
    }">
    <item-header
      :item="item" />
    <div class="relative flex items-center justify-center h-32 pl-4">
      <item-image
        :item="item" />
    </div>
    <div
      class="relative z-10 flex items-center justify-between px-2 py-1 text-sm">
      <div>
        <span class="text-lg">x{{ lootedItem ? lootedItem.qty : '-' }}</span> <span class="text-xs text-gray-400">of {{ item.qty }}</span>
      </div>
      <item-price
        class="flex flex-col items-end"
        :show-time-ago="false"
        :isEditable="false"
        :item="item" />
    </div>
  </div>
</template>

<script>
import { getImage } from "../services/item-image";
import { usePriceDisplay } from "./hooks/HasPrice";
import ItemImage from "./ItemImage.vue";
import ItemHeader from "./ItemHeader.vue";
import ItemPrice from "./ItemPrice.vue";
export default {
  props: [
    'item',
    'member-loot',
  ],
  components: {
    ItemImage,
    ItemHeader,
    ItemPrice,
  },
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
    image () {
      return getImage(this.item.id, this.item.text)
    },
    lootedItem () {
      for (const loot of this.memberLoot.loot) {
        if (loot.id === this.item.id) {
          return loot
        }
      }
      return null
    },
    isLootActive () {
      for (const loot of this.memberLoot.loot) {
        if (loot.id === this.item.id) {
          return true
        }
      }
      return false
    },
  },
  methods: {
  }
}
</script>
