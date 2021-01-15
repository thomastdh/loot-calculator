<template>
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
</template>

<script>
export default {
  computed: {
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
    onRemoveMember (id) {
      this.$store.commit('removeMember', id)
    },
  }
}
</script>

<style>

</style>
