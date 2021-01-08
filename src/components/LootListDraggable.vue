<template>
  <draggable
    class="flex flex-wrap -mx-0.5"
    v-model="draggableItems"
    group="lootItems"
    handle=".handle"
    @start="drag=true"
    @end="drag=false"
    item-key="id">
    <template
      #item="{element}">
      <div class="w-1/2 md:w-1/3 lg:w-1/4 px-0.5 mb-1">
        <loot-item :item="element" />
      </div>
    </template>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import LootItem from "./LootItem.vue";
export default {
  props: ['items'],
  components: {
    draggable,
    LootItem,
  },
  computed: {
    draggableItems: {
      get () {
        return this.items
      },
      set (value) {
        this.$emit('dragged', {
          items: value
        })
      }
    }
  }
}
</script>

<style>

</style>
