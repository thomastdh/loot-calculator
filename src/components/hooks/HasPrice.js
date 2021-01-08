import { computed } from "vue";
import store from "./../../store";

export const usePriceDisplay = ({ item }) => {

  const hasPrice = computed(() => {
    if (store.state.pricingSheet[item.id] === undefined) {
      return false
    }
    return store.state.pricingSheet[item.id].hasMarketPrice
  })
  const isPriceLoading = computed(() => {
    return store.state.pricingSheet[item.id] === undefined
  })
  const price = computed(() => {
    if (store.state.pricingSheet[item.id] !== undefined) {
      return store.state.pricingSheet[item.id]
    }
    return null
  })
  const priceDisplay = computed(() => {
    if (!price.value) {
      return '-'
    }
    return price.value.price.toLocaleString()
  })

  return {
    price,
    hasPrice,
    priceDisplay,
    isPriceLoading,
  }

}
