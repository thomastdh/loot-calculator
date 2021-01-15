<template>
<nav class="bg-gray-800">
  <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div class="relative flex items-center justify-between h-16">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <!-- Mobile menu button-->
        <button
          @click="isMobileNavOpen = !isMobileNavOpen"
          class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <!-- Icon when menu is closed. -->
          <!--
            Heroicon name: menu

            Menu open: "hidden", Menu closed: "block"
          -->
          <svg
            :class="{
              'hidden': isMobileNavOpen,
              'block': !isMobileNavOpen,
            }"
            class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <!-- Icon when menu is open. -->
          <!--
            Heroicon name: x

            Menu open: "block", Menu closed: "hidden"
          -->
          <svg
            :class="{
              'hidden': !isMobileNavOpen,
              'block': isMobileNavOpen,
            }"
            class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
        <div class="flex items-center flex-shrink-0">
            <h3 class="text-white">
                Loot Distribution Calculator
            </h3>
        </div>
        <div class="flex-grow hidden sm:block sm:ml-6">
          <div class="flex items-center w-full">
            <div class="space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <router-link
                class="px-3 py-2 text-sm font-medium text-white rounded-md"
                :to="'/'">Home</router-link>
              <router-link
                class="relative px-3 py-2 text-sm font-medium text-white rounded-md"
                :to="'/changelog'">
                Changelog
                <span
                  v-if="hasUnreadChangelog"
                  class="absolute top-0 right-0 w-2 h-2 mt-1 mr-1 bg-yellow-300 rounded-full"></span>
              </router-link>
            </div>
            <div class="ml-auto">
              <tippy
                interactive
                ref="apiTippy"
                placement="bottom-start"
                animation="scale"
                trigger="click">
                <button
                  class="inline-flex items-center px-3 py-2 text-sm text-right text-white border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus: hover:border-gray-500 group">
                  <div>
                    <div class="text-xs text-gray-400">API Provider</div>
                    <div>
                      {{displayedProvider}}
                    </div>
                  </div>
                  <div>
                    <svg
                      class="w-3 h-3 ml-2 text-gray-400 group-hover:text-gray-300"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </button>
                <template #content>
                  <div class="w-64 mt-4 overflow-hidden text-white bg-black rounded">
                    <div class="p-4 text-sm text-gray-400 ">
                      Choose your API Provider
                    </div>
                    <div class="flex flex-col">
                      <button type="button"
                        v-for="provider in providers"
                        :key="provider.key"
                        @click="onChooseApi(provider.key)"
                        class="block p-4 text-left text-white hover:bg-green-600">
                        {{provider.label}}
                      </button>
                    </div>
                  </div>
                </template>
              </tippy>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  -->
  <div
    :class="{
      'block': isMobileNavOpen,
      'hidden': !isMobileNavOpen,
    }"
    class="sm:hidden">
    <div class="px-2 pt-2 pb-3 space-y-1">
      <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
      <router-link
        class="block px-3 py-2 text-base font-medium text-white rounded-md"
        :to="'/'">Home</router-link>
      <router-link
        class="block px-3 py-2 text-base font-medium text-white rounded-md "
        :to="'/changelog'">Changelog</router-link>
    </div>
    <div class="p-4 text-sm text-gray-400 border-t border-gray-700">
      API Provider
    </div>
    <div class="flex flex-col">
      <button type="button"
        @click="onChooseApi(provider.key)"
        v-for="provider in providers"
        :key="provider.key"
        class="flex items-center block p-4 text-left"
        :class="{
          'text-white': apiProvider === provider.key,
          'text-gray-500': apiProvider !== provider.key,
        }">
        <div>
          <div
            class="inline-flex items-center justify-center w-5 h-5 mr-2 border rounded"
            :class="{
              'border-gray-500': apiProvider !== provider.key,
              'border-green-500 bg-green-500': apiProvider === provider.key,
            }">
            <svg
              class="w-4 h-4 text-white"
              v-if="apiProvider === provider.key"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="-mt-1">{{provider.label}}</div>
      </button>
    </div>
  </div>
</nav>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      isMobileNavOpen: false,
      providers: [
        {
          key: 'EVE_MARKET',
          label: 'EVE Echoes Market API',
        },
        {
          key: 'TRIMARK',
          label: 'Trimark Market API',
        },
      ],
    }
  },
  computed: {
    ...mapState([
      'apiProvider',
      'apiKey',
    ]),
    ...mapGetters([
      'hasUnreadChangelog',
    ]),
    displayedProvider () {
      if (!this.apiProvider) {
        return 'n/a'
      }
      if (this.apiProvider === 'EVE_MARKET') {
        return 'EVE Echoes Market API'
      }
      return 'Trimark API'
    },
  },
  methods: {
    onChooseApi (provider) {
      this.$store.commit('setApiProvider', provider)
      this.$refs.apiTippy && this.$refs.apiTippy.hide()
      if (this.apiKey) {
        this.$store.commit('resetPricing')
        this.$store.dispatch('checkMissingPrice')
      }
    },
  }
}
</script>

<style>

</style>
