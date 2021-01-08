import { createStore } from 'vuex'
import { checkPrice } from '../services/price-check'
import { calculate_distribution } from "./../services/distribution-calculator";

export default createStore({
  state: {
    items: [],
    members: [],
    savedMembers: [],
    pricingSheet: {},
    distribution: [],
    // UI
    lootActiveMember: null,
    lootDisplay: 'grid',
    isShowingEditPriceModal: false,
    editingItemId: null,
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
    }
  },
  mutations: {
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
  },
  actions: {
    resetItems ({ state }) {
      state.items = []
      state.distribution = []
    },
    async checkItemPricingByAPI ({ state }, { id }) {
      let result = await checkPrice(id)
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
