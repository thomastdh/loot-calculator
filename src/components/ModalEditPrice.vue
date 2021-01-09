<template>
  <vue-final-modal
    :escToClose="true"
    classes="modal-container"
    content-class="modal-content"
    v-model="isShowingEditPriceModal">
    <div
      class="bg-black border-t-2 border-green-600 bg-opacity-80">
      <div class="flex items-center justify-between px-4 py-2 ">
        <div class="text-2xl text-white">
          Edit Item
        </div>
        <div>
          <button
            @click="isShowingEditPriceModal = false"
            class="p-2 text-white opacity-60 hover:opacity-80 focus:outline-none hover:outline-none" type="button">
            <svg
              class="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <div class="p-4 text-white w-128"
         v-if="editedItem">
        <div class="flex items-center w-full -mx-4">
          <div class="w-4/12">
            <item-image
              :item="editedItem" />
          </div>
          <div class="w-8/12">
            <div class="mb-4 text-2xl">
              {{ editedItem.text }}
            </div>
            <div>
              <div>
                <label class="block px-1 text-sm text-gray-400" for="priceValue">Price</label>
                <input
                  type="text"
                  id="priceValue"
                  @keydown.enter="onSetPrice"
                  ref="priceInput"
                  v-model="editedPrice"
                  class="inline-block w-full h-10 p-1 ml-1 text-2xl text-white bg-gray-900 border border-gray-600 bg-opacity-80 focus:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-800 bg-opacity-30">
                <div class="flex items-center justify-end w-full p-1 text-sm text-gray-500">
                  {{ formattedEditedPrice }}
                  <svg
                    class="w-3 h-3 -mt-0.5"
                    viewBox="0 0 255 255" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g>
                            <path d="M201.401367,227 L210.776367,174.412109 L205.942383,173.533203 C200.766602,190.232422 194.833984,201.316406 188.144531,206.785156 C181.455078,212.253906 171.860352,214.988281 159.360352,214.988281 L159.360352,214.988281 L77.9150391,214.988281 L208.432617,28.3671875 L61.5087891,28.3671875 L57.4072266,78.0253906 L62.9736328,78.0253906 C65.0244141,66.1113281 67.2949219,57.9814453 69.7851562,53.6357422 C72.2753906,49.2900391 75.8886719,45.9697266 80.625,43.6748047 C85.3613281,41.3798828 93.0029297,40.2324219 103.549805,40.2324219 L103.549805,40.2324219 L167.124023,40.2324219 L39.6826172,221.580078 L39.6826172,227 L201.401367,227 Z" fill="currentColor" fill-rule="nonzero"></path>
                            <line x1="57.25" y1="126.75" x2="197.75" y2="127.25" id="Line" stroke="currentColor" stroke-width="4" stroke-linecap="square"></line>
                        </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end w-full px-3 mt-4">
          <button
            @click="onSetPrice"
            class="px-4 py-3 text-lg text-white transition duration-200 ease-in-out bg-green-400 bg-opacity-80 hover:bg-green-700"
            type="button"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { mapState } from "vuex";
import ItemImage from "./ItemImage.vue";
export default {
  components: {
    ItemImage,
  },
  mounted () {
  },
  data () {
    return {
      editedPrice: 0,
    }
  },
  watch: {
    isShowingEditPriceModal (newVal) {
      if (newVal === true) {
        setTimeout(() => {
          this.$refs.priceInput.focus()
          this.$refs.priceInput.select()
        }, 250);
      }
    },
    editedItem (newVal) {
      if (!newVal) {
        return
      }
      this.editedPrice = this.$store.state.pricingSheet[newVal.id].price
    }
  },
  computed: {
    ...mapState([
      'editingItemId',
    ]),
    isShowingEditPriceModal: {
      get () {
        return this.$store.state.isShowingEditPriceModal
      },
      set () {
        this.$store.commit('cancelEditPrice')
      }
    },
    editedItem () {
      if (!this.editingItemId) {
        return null
      }
      for (let index = 0; index < this.$store.state.items.length; index++) {
        const element = this.$store.state.items[index];
        if (element.id === this.editingItemId) {
          return element
        }
      }
      return null
    },
    formattedEditedPrice () {
      if (Number.isNaN(this.editedPrice)) {
        return 0
      }
      return Math.round(this.editedPrice).toLocaleString()
    }
  },
  methods: {
    onSetPrice () {
      this.$store.commit('setItemPrice', {
        id: this.editingItemId,
        price: parseInt(this.editedPrice)
      })
      this.$store.commit('cancelEditPrice')
    }
  }
}
</script>

<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1rem;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
</style>

