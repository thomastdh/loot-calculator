<template>
  <div>
    <global-events
      :filter="(event, handler, eventName) => event.target.tagName !== 'INPUT'"
      @keydown="onKeyUp"
      />
    <select2
      class="w-full ring-black ring-2"
      :options="selectItems"
      ref="select2"
      :settings="selectSettings"
      v-model="localValue"
      @select="onSelect"
     />
  </div>
</template>

<script>
import $ from "jquery";
import Select2 from 'vue3-select2-component';
import { GlobalEvents } from "vue-global-events";

export default {
  props: [
  ],
  components: {
    Select2,
    GlobalEvents,
  },
  data () {
    return {
      localValue: '',
      selectItems: [],
      selectSettings: {
        width: '100%',
        tags: true,
        placeholder: {
          id: '-1', // the value of the option
          text: 'Select or add member'
        }
      },
    }
  },
  methods: {
    onKeyUp (event) {
      if (event.key !== 'm') {
        return
      }
      this.$refs.select2.select2.select2('open')
    },
    onSelect (event) {
      this.$emit('input', {
        text: event.text,
        id: event.id
      })
      this.localValue = null
      $(this.$refs.select2.select2).val(null)
      $(this.$refs.select2.select2).trigger('change')
    },
  }
}
</script>

<style>

</style>
