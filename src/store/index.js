import { createStore } from 'vuex'
import { checkPriceEchoesMarket, checkPriceTrimark } from '../services/price-check'
import { calculate_distribution } from "./../services/distribution-calculator";
import { useLocalStorage } from '@vueuse/core'

const CHANGELOG_VERSION = '2021-02-12-1';

// persist state in localStorage
const LOCAL_STORE_ITEMS = useLocalStorage(
  'ee-session-items',
  [],
)
const LOCAL_STORE_SETTINGS = useLocalStorage(
  'ee-session-settings',
  {
    apiKey: '',
    apiProvider: 'EVE_MARKET',
    changelogRead: '',
  },
)
const LOCAL_STORE_MEMBERS = useLocalStorage(
  'ee-members',
  []
)

export default createStore({
  state: {
    items: [],
    members: [],
    savedMembers: [],
    pricingSheet: {},
    distribution: [],
    // API
    apiProvider: LOCAL_STORE_SETTINGS.value.apiProvider, // 'EVE_MARKET' | 'TRIMARK'
    apiKey: LOCAL_STORE_SETTINGS.value.apiKey,
    // UI
    lootActiveMember: null,
    lootDisplay: 'grid',
    isShowingEditPriceModal: false,
    editingItemId: null,
    changelogVersion: CHANGELOG_VERSION,
  },
  getters: {
    currentTotal: state => {
      let total = 0
      state.items.forEach(item => {
        let price = state.pricingSheet[item.id]
        if (!price) {
          return
        }
        total += (price.price * item.qty)
      })
      return total
    },
    averageLootValue: (state, getters) => {
      if (state.members.length === 0 || getters.currentTotal === 0) {
        return 0
      }
      const average = getters.currentTotal / state.members.length
      return Math.floor(average)
    },
    hasUnreadChangelog: state => {
      return state.changelogVersion !== LOCAL_STORE_SETTINGS.value.changelogRead
    },
  },
  mutations: {
    loadSessionApiKey (state) {
      state.apiKey = [...LOCAL_STORE_SETTINGS.value.apiKey]
    },
    setSessionApiKey (state, apiKey) {
      state.apiKey = apiKey
      LOCAL_STORE_SETTINGS.value = {
        ...LOCAL_STORE_SETTINGS.value,
        apiKey,
      }
    },
    loadSessionItems (state) {
      state.items = [...LOCAL_STORE_ITEMS.value]
    },
    loadSessionMembers (state) {
      state.members = [...LOCAL_STORE_MEMBERS.value]
    },
    setSessionItems (state) {
      LOCAL_STORE_ITEMS.value = [...state.items]
    },
    setSessionMembers (state) {
      LOCAL_STORE_MEMBERS.value = [...state.members]
    },
    setSessionChangelogRead (state) {
      LOCAL_STORE_SETTINGS.value = {
        ...LOCAL_STORE_SETTINGS.value,
        changelogRead: state.changelogVersion,
      }
      console.log(LOCAL_STORE_SETTINGS.value)
      console.log(state.changelogVersion)
    },
    updateItems (state, newList) {
      state.items = newList
    },
    removeItem (state, { id }) {
      state.items = state.items.filter(item => item.id !== id)
    },
    setItemQuantity (state, { id, qty }) {
      const index = state.items.findIndex(item => item.id === id)
      if (index === -1) {
        return
      }
      qty = parseInt(qty)
      if (!qty) {
        qty = 0
      }
      const item = {...state.items[index]}
      item.qty = qty
      state.items.splice(index, 1, item)
    },
    setEditPrice (state, itemId) {
      state.editingItemId = itemId
      setTimeout(() => {
        state.isShowingEditPriceModal = true
      }, 50);
    },
    cancelEditPrice (state) {
      state.editingItemId = null
      state.isShowingEditPriceModal = false
    },
    setItemPrice (state, { id, price }) {
      let priceSheet = {...state.pricingSheet[id]}
      priceSheet.isPriceEdited = priceSheet.originalPrice !== price
      priceSheet.price = price
      state.pricingSheet[id] = priceSheet
    },
    addMember (state, member) {
      state.members = [
        ...state.members,
        member
      ]
    },
    removeMember (state, id) {
      state.members = state.members.filter(item => item.id !== id)
    },
    updateMembers (state, members) {
      state.members = members
    },
    setActiveLootMember (state, name) {
      state.lootActiveMember = name
    },
    setApiProvider (state, provider) {
      state.apiProvider = provider
      LOCAL_STORE_SETTINGS.value = {
        ...LOCAL_STORE_SETTINGS.value,
        apiProvider: provider,
      }
    },
    resetPricing (state) {
      state.pricingSheet = {}
    },
  },
  actions: {
    resetItems ({ state }) {
      state.items = []
      state.distribution = []
    },
    async checkMissingPrice ({ state, dispatch }) {
      for (const item of state.items) {
        if (state.pricingSheet[item.id]) {
          return
        }
        await dispatch('checkItemPricingByAPI', { id: item.id })
      }
    },
    async checkItemPricingByAPI ({ state }, { id }) {
      let result;
      if (state.apiProvider === 'EVE_MARKET') {
        result = await checkPriceEchoesMarket(id)
      } else if (state.apiProvider === 'TRIMARK') {
        result = await checkPriceTrimark(id, state.apiKey)
      } else {
        return;
      }
      const price = result.hasMarketPrice ? result.price : 0;
      state.pricingSheet[id] = {
        hasMarketPrice: result.hasMarketPrice,
        price: price,
        status: result.status,
        hoursAgo: result.hoursAgo,
        isPriceEdited: false,
        originalPrice: price,
      }
    },
    calculateLoot ({ state, commit }) {
      // Assign price to items
      const items = state.items.map(item => {
        return {
          ...item,
          price: state.pricingSheet[item.id].price
        }
      })
      let result = calculate_distribution(
        state.members,
        items
      )
      state.distribution = result.distribution
      commit('setActiveLootMember', result.distribution[0].name)
    },
  },
  modules: {
  }
})
