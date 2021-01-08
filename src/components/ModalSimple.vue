<template>
  <vue-final-modal
    :escToClose="true"
    classes="modal-container"
    content-class="overflow-scroll modal-content"
    v-model="isModalShown">
    <div
      class="bg-black border-t-2 border-green-600 bg-opacity-80">
      <div class="flex items-center justify-between px-4 py-2 ">
        <div class="text-2xl text-white">
          Result
        </div>
        <div>
          <button
            @click="isModalShown = false"
            class="p-2 text-white opacity-60 hover:opacity-80 focus:outline-none hover:outline-none" type="button">
            <svg
              class="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <slot></slot>
    </div>
  </vue-final-modal>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: [
    'show'
  ],
  components: {
  },
  mounted () {
  },
  computed: {
    ...mapState([
      'editingItemId',
    ]),
    isModalShown: {
      get () {
        return this.show
      },
      set () {
        this.$emit('close')
      }
    },
  },
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

