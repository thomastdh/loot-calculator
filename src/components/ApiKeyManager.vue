<template>
  <div>
    <button type="button"
      @click="isPanelOpen = !isPanelOpen"
      class="inline-flex items-center px-5 py-2 text-sm text-white"
      :class="{
        'bg-green-700': apiKeySet,
        'bg-red-600': !apiKeySet,
      }">
      API Key
      <svg
        v-if="apiKeySet"
        class="inline-block w-3 h-3 ml-4 text-white"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
      </svg>
      <svg
        v-else-if="!apiKeySet"
        class="inline-block w-5 h-5 ml-4 text-white"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
    </button>
    <div v-if="isPanelOpen"
      class="p-4 text-sm text-center text-white bg-gray-900">
      <div class="mb-2">
        API key is required to access Trimark Market API. Your API key is unique to your Trimark character account, and can be retrieved from 'My Account' section within Trimark app. Once saved, your API key will be remembered locally on your current browser for future sessions.
      </div>
      <div class="inline-flex items-stretch max-w-md mx-auto">
        <input
          type="text"
          id="apiKeyValue"
          v-model="editedApiKey"
          placeholder="Enter your API key"
          class="inline-block w-64 h-10 px-3 py-1 ml-1 text-white bg-gray-900 border border-gray-600 bg-opacity-80 focus:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-800 bg-opacity-30">
        <button type="button"
          @click="onSave"
          class="px-12 py-2 text-white transition duration-200 ease-in-out bg-green-400 bg-opacity-80 hover:bg-green-700">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      isPanelOpen: false,
      editedApiKey: '',
    }
  },
  computed: {
    ...mapState([
      'apiProvider',
      'apiKey',
    ]),
    apiKeySet () {
      if (!this.apiKey) {
        return false
      }
      return true
    },
  },
  methods: {
    onSave () {
      this.$store.commit('setSessionApiKey', this.editedApiKey)
      this.isPanelOpen = !this.isPanelOpen
      if (this.apiKey) {
        this.$store.commit('resetPricing')
        this.$store.dispatch('checkMissingPrice')
      }
    }
  },
  mounted () {
    if (!this.apiKey) {
      this.isPanelOpen = true
    } else {
      this.editedApiKey = this.apiKey
    }
  }
}
</script>

<style>

</style>
