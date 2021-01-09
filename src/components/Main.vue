<template>
  <div>
    <div class="relative mt-8 text-white bg-gray-700 border-t-4 border-green-700 bg-opacity-40">
      <div class="sticky top-0 z-30 flex p-2 mb-4 bg-black bg-opacity-50">
        <div class="ml-auto w-96">
          <div class="text-xs text-right text-gray-400">
            Press '/' to add item
          </div>
          <searcher
            :value="currentSearch"
            @input="onInput" />
        </div>
      </div>
      <div class="flex justify-between px-4">
        <div>
          <button
            class="inline-flex items-center px-2 py-1 text-sm text-white hover:bg-gray-700 hover:bg-opacity-70"
            @click="onLoadLastSession"
            type="button">
            <svg
              class="inline-block w-4 h-4 mr-1"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Load Last Session
          </button>
        </div>
        <div>
          <button
            class="inline-flex items-center px-2 py-1 text-sm text-white hover:bg-gray-700 hover:bg-opacity-70"
            @click="resetItems"
            type="button">
            <svg
              class="inline-block w-4 h-4 mr-1"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
            Reset
          </button>
        </div>
      </div>
      <div class="flex flex-wrap items-stretch px-3 py-4 -mx-1">
        <div class="order-3 w-full px-1 mb-4 md:w-3/12 md:order-1 md:mb-0">
          <div class="flex flex-col h-full">
            <div class="flex-grow bg-black bg-opacity-30">
              <div class="p-2 bg-green-900 bg-opacity-10">
                <div class="text-green-700">Members</div>
              </div>
              <div>
                <div v-if="members.length <= 0"
                  class="flex flex-col items-center justify-center py-12">
                  <div class="inline-flex items-center justify-center w-16 h-16 p-3 mb-4 border border-gray-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg"
                      class="w-full h-full text-gray-500"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <div class="max-w-xs mx-auto text-sm text-center text-gray-500">
                    <div class="uppercase">Add your first member below</div>
                  </div>
                </div>
                <div v-else
                  class="flex justify-between p-2 mb-1 bg-gray-700 bg-opacity-20 group"
                  v-for="member in members"
                  :key="member.id">
                  <div>
                    {{ member.text }}
                  </div>
                  <div>
                    <button
                      @click="onRemoveMember(member.id)"
                      type="button"
                      tabindex="-1"
                      class="p-1 opacity-0 group-hover:opacity-100 hover:bg-red-800 hover:text-white hover:bg-opacity-30">
                      <svg
                        class="w-3 h-3"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="text-xs text-gray-400">
                Press 'm' to add member
              </div>
              <member-searcher
                @input="onAddMember" />
            </div>
          </div>
        </div>
        <div class="order-2 w-full px-1 md:w-9/12 md:order-1">
          <div class="relative h-full p-2 pb-1 bg-black bg-opacity-40"
            ref="itemListPanel"
            style="min-height: calc(100vh - 360px)">
            <global-events
              :filter="(event, handler, eventName) => event.target.tagName !== 'INPUT'"
              @keydown="onKeyUp"
              />
            <div class="absolute top-0 left-0 -mt-5">
              <div class="text-xs text-gray-400">
                Press 'q' to batch update quantities (then 'TAB' to cycle through)
              </div>
            </div>
            <div v-if="items.length <= 0"
              class="flex flex-col items-center justify-center h-full py-12">
              <div class="inline-flex items-center justify-center w-16 h-16 p-1 mb-2 border border-gray-500 rounded-full">
                <svg
                  class="w-full h-full text-gray-500"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="text-sm text-center text-gray-500">
                <div class="uppercase">No Items</div>
              </div>
            </div>
            <loot-list-draggable
              v-else
              @dragged="onUpdateList"
              :items="items" />
          </div>
        </div>
      </div>
      <div ref="itemListFooter"></div>
      <div
        class="sticky bottom-0 z-30 flex p-2 mt-2 bg-black bg-opacity-70">
        <div class="px-2 py-1">
          <div class="text-xs text-gray-400">Estimated Total</div>
          <div class="text-2xl text-yellow-400">
            <animated-number
              :value="currentTotal"
              :formatValue="formatToPrice"
              :easing="'easeInQuad'"
              :duration="300" />
          </div>
        </div>
        <div class="ml-auto">
          <button
            :disabled="!canCaculateLoot"
            @click.prevent="startCalculation"
            type="button"
            :class="{
              'bg-green-400 bg-opacity-80 hover:bg-green-700 text-white': canCaculateLoot,
              'bg-gray-700 bg-opacity-80 cursor-not-allowed text-gray-500': !canCaculateLoot,
            }"
            class="px-4 py-3 text-lg transition duration-200 ease-in-out">
            Calculate Loot
          </button>
        </div>
      </div>
    </div>
    <div
      class="relative mt-8 text-white bg-gray-700 border-t-4 border-green-700 bg-opacity-40"
      ref="resultPanel"
      v-if="distribution.length">
      <div class="flex justify-end px-3 py-3">
        <button
          class=""
          @click="onShowClipboardResult"
          type="button">
          Copy to Clipboard
        </button>
      </div>
      <div class="flex-wrap items-stretch hidden px-3 py-4 -mx-1 md:flex">
        <div class="relative order-3 w-full px-1 mb-4 md:w-3/12 md:order-1 md:mb-0">
          <div class="flex flex-col md:sticky md:top-0">
            <div class="bg-black bg-opacity-30">
              <div class="p-2 bg-green-900 bg-opacity-10">
                <div class="text-green-700">Result</div>
              </div>
              <div>
                <div
                  class="relative p-2 mb-1 cursor-pointer"
                  @click="setActiveLootMember(distro.name)"
                  :class="{
                    'bg-green-700': lootActiveMember === distro.name,
                    'bg-gray-700 bg-opacity-20 hover:bg-opacity-40': lootActiveMember !== distro.name,
                  }"
                  v-for="distro in distribution"
                  :key="distro.name">
                  {{ distro.name }}
                  <div class="member-caret" v-if="lootActiveMember === distro.name"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-2 w-full px-1 md:w-9/12 md:order-1">
          <div
            v-for="memberLoot in distribution"
            :key="memberLoot.name">
            <member-loot-list
              v-if="lootActiveMember === memberLoot.name"
              :items="items"
              :member-loot="memberLoot" />
          </div>
        </div>
      </div> <!-- Desktop - Loot result -->

      <!-- Mobile - Loot Result -->
      <div class="block md:hidden">
        <div
          v-for="memberLoot in distribution"
          :key="memberLoot.name"
          class="p-4 mb-4 bg-black ">
          <div class="mt-8 mb-4 text-lg text-white">
            {{memberLoot.name}}
          </div>
          <member-loot-list
            :items="items"
            :member-loot="memberLoot" />
        </div>
      </div>
    </div>

    <!-- Modal -->
    <modal-edit-price />
    <modal-simple
      :show="isShowingClipboardResult"
      @close="isShowingClipboardResult = false">
      <div class="p-4">
        <div
          v-for="(result, index) in clipboardResult"
          :key="index">
          <div class="flex px-1 py-2 text-gray-400 border-b-2 border-green-600">
            <div v-if="clipboardResult.length > 1"
              class="">
              Part {{index + 1}} of {{ clipboardResult.length }}
            </div>
            <div class="ml-auto">
              <button type="button"
                @click="onCopyClipboard(index)"
                class="inline-flex items-center p-1 text-xs uppercase focus:outline-none hover:bg-gray-600">
                <svg
                  class="inline-block w-4 h-4 mr-1 text-sm text-white"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
                Copy
              </button>
            </div>
          </div>
          <textarea
            class="p-1 text-sm text-white bg-gray-800 w-96 md:w-128 focus:outline-none focus:bg-gray-900"
            rows="12"
            :ref="`lootTextArea${index}`"
            v-html="result"></textarea>
        </div>
      </div>
    </modal-simple>
  </div>
</template>

<script>
import Searcher from "./Searcher.vue";
import MemberSearcher from "./MemberSearcher.vue";
import LootListDraggable from "./LootListDraggable.vue";
import MemberLootList from "./MemberLootList.vue";
import ModalEditPrice from "./ModalEditPrice.vue";
import ModalSimple from "./ModalSimple.vue";
import Scroll from "./../services/scroll";
import $ from "jquery";
import { format } from "./../services/result-plaintext";
import { mapGetters, mapState, mapActions } from "vuex";
import AnimatedNumber from './common/AnimatedNumber.vue';
import { GlobalEvents } from "vue-global-events";
export default {
  components: {
    Searcher,
    MemberSearcher,
    LootListDraggable,
    MemberLootList,
    ModalEditPrice,
    ModalSimple,
    AnimatedNumber,
    GlobalEvents,
  },
  mounted () {
    // this.items = [
    //   { "qty": 4, "text": "'Bannerman' Large Group Shield Booster ", "id": "11539200021" },
    //   { "qty": 4, "text": "'Aura' Warp Core Stabilizer", "id": "11511000012" },
    //   { "qty": 12, "text": "Blood Raider Ship Debris", "id": "44070000000" },
    //   { "qty": 4, "text": "Capacitor Control Circuit III Blueprint", "id": "61711010006" },
    //   { "qty": 5, "text": "Miner Circulation Accelerator III Blueprint", "id": "61717010006" },
    //   { "qty": 3, "text": "Datacore - Amarrian Starship Engineering", "id": "27021000000" },
    //   { "qty": 12, "text": "Datacore - Laser Physics", "id": "27021000013" },
    //   { "qty": 42, "text": "Datacore - Gallentean Starship Engineering", "id": "27021000007" },
    //   { "qty": 32, "text": "Datacore - Rocket Science", "id": "27021000011" },
    //   { "qty": 42, "text": "Datacore - Electromagnetic Physics", "id": "27021000003" },
    //   { "qty": 23, "text": "Datacore - Mechanical Engineering", "id": "27021000012" },
    //   { "qty": 42, "text": "Metal Scraps", "id": "27116000001" },
    //   { "qty": 4, "text": "Centus C-Type Large Pulse Laser", "id": "11002710024" },
    //   { "qty": 4, "text": "Core C-Type Large Snubnosed Railgun", "id": "11000720024" }
    // ]
    // this.items.forEach(item => {
    //   this.$store.dispatch('checkItemPricingByAPI', {id: item.id})
    // })
    // this.members = [
    //   { id: 'Chapelini', text: 'Chapelini', },
    //   { id: 'Chapelini 2', text: 'Chapelini 2', },
    //   { id: 'Chapelini 3', text: 'Chapelini 3', },
    //   { id: 'Chapelini 4', text: 'Chapelini 4', },
    //   { id: 'Chapelini 5', text: 'Chapelini 5', },
    //   { id: 'Chapelini 6', text: 'Chapelini 6', },
    //   { id: 'Chapelini 7', text: 'Chapelini 7', },
    // ]
  },
  data () {
    return {
      currentSearch : {},
      clipboardResult: [],
      isShowingClipboardResult: false,
    }
  },
  computed: {
    ...mapState([
      'pricingSheet',
      'distribution',
      'lootActiveMember',
    ]),
    ...mapGetters([
      'currentTotal',
    ]),
    canCaculateLoot () {
      if (this.items.length <= 0) {
        return false
      }
      if (this.members.length <= 0) {
        return false
      }
      return true
    },
    items: {
      get() {
          return this.$store.state.items
      },
      set(value) {
          this.$store.commit('updateItems', value)
      }
    },
    members: {
      get() {
          return this.$store.state.members
      },
      set(value) {
          this.$store.commit('updateMembers', value)
      }
    },
  },
  methods: {
    ...mapActions([
      'calculateLoot',
      'resetItems',
    ]),
    formatToPrice (val) {
      if (!val) {
        return 0
      }
      return Math.round(val).toLocaleString()
    },
    onLoadLastSession () {
      if (this.items.length > 0) {
        let shouldClear = confirm('This will clear currently selected items, are you sure?')
        if (!shouldClear) {
          return
        }
      }
      this.$store.commit('loadSessionMembers')
      this.$store.commit('loadSessionItems')
      this.$store.dispatch('checkMissingPrice')
    },
    async startCalculation () {
      await this.calculateLoot()
      setTimeout(() => {
        const scroller = new Scroll;
        let top = $(this.$refs.resultPanel).offset().top
        scroller.scrollTo(top)
      }, 100);
      this.$store.commit('setSessionItems')
      this.$store.commit('setSessionMembers')
    },
    setActiveLootMember (name) {
      this.$store.commit('setActiveLootMember', name)
    },
    onRemoveMember (id) {
      this.$store.commit('removeMember', id)
    },
    onUpdateList (newList) {
      this.items = newList.items
    },
    onInput (e) {
      const toAdd = {
        qty: 1,
        ...e
      }
      this.items = [
        ...this.items,
        toAdd
      ]
      this.$store.dispatch('checkItemPricingByAPI', {
        id: e.id,
      })
      this.currentSearch = {}
      this.$nextTick(() => {
        const itemPanelFooter = this.$refs.itemListFooter
        const scroller = new Scroll()
        let windowHeight = $(window).height()
        scroller.scrollTo(
          $(itemPanelFooter).offset().top - windowHeight + 80
        )
      })
    },
    onAddMember (e) {
      this.members = [
        ...this.members,
        e
      ]
    },
    onShowClipboardResult () {
      this.clipboardResult = format(
        this.distribution,
        this.currentTotal
      )
      this.isShowingClipboardResult = true
    },
    onCopyClipboard (index) {
      let ref = this.$refs[`lootTextArea${index}`]
      if (!ref) {
        return
      }
      ref.select()
      document.execCommand('copy');
    },
    onKeyUp () {
      if (event.key !== 'q') {
        return
      }
      $('input.qty-input').first().focus()
    }
  }
}
</script>

<style scoped>
.member-caret {
  position: absolute;
  right: 0;
  top: 50%;
  margin-right: 3px;
  margin-top: -11px;
}

.member-caret:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  border-left: 10px solid #047857;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}

.member-caret:after {
  content: '';
  position: absolute;
  left: 0;
  top: 1px;
  border-left: 9px solid #047857;
  border-top: 9px solid transparent;
  border-bottom: 9px solid transparent;
}
</style>
