import { ref, watchEffect, onMounted } from "vue";
import { FACTION_BLUES, FACTION_GREENS, NAMED_GREENS } from "./../../data/item-ranking";

const startsWithArray = (strings, text) => {
  for (const str of strings) {
    if (text.startsWith(str)) {
      return true
    }
  }
  return false
}

export const useItemRanking = ({ item }) => {

  const isNamed = ref(false);
  const isFactionGreen = ref(false);
  const isFactionBlue = ref(false);

  onMounted(() => {
    watchEffect(
      () => {
        if (!item) {
          return
        }
        const text = item.text
        isNamed.value = startsWithArray(NAMED_GREENS, text)
        isFactionGreen.value = startsWithArray(FACTION_GREENS, text)
        isFactionBlue.value = startsWithArray(FACTION_BLUES, text)
      }
    )
  })

  return {
    isNamed,
    isFactionGreen,
    isFactionBlue,
  }

}
