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
import { ref, watch } from "vue";
import Select2 from 'vue3-select2-component';
import { GlobalEvents } from "vue-global-events";
import ITEMS from "./../data/echoes_items";
import { getImage } from "../services/item-image";

const FILTERED_ITEMS = ITEMS.filter((item) => {
  let { id, text } = item
  // Ship
  if (id.startsWith('10')) {
    return false;
  }
  // Ship blueprints
  if (id.startsWith('60')) {
    return false;
  }
  // PLEX, Mission items
  if (id.startsWith('28')) {
    return false;
  }
  // Skins
  if (id.startsWith('80')) {
    return false;
  }
  // Planetary
  if (id.startsWith('42')) {
    return false;
  }
  // Ores
  if (id.startsWith('51')) {
    return false;
  }
  // Minerals
  if (id.startsWith('4100000')) {
    return false;
  }
  // Remove IV blueprints and modules for now
  if (text.endsWith('IV') || text.endsWith('IV Blueprint')) {
    return false;
  }
  return true
})

const formatState = (state) => {
  if (!state.id) {
    return state.text;
  }
  try {
    let image = getImage(state.id, state.text)
    let result = `<div class="flex">
      <div class="relative w-8 h-8 mr-1">
        <img
          class="w-full h-auto"
          src="${image.src}"/>
      </div>
      <span>${state.text}</span>
    </div>`
    return $(result);
  } catch (error) {
    return state.text
  }
};

export default {
  setup (props, { emit }) {
    let localValue = ref('')

    watch(() => props.value, (newVal) => {
      if (!newVal.id) {
        localValue.value = ''
      }
      localValue.value = newVal.id
    })

    const onSelect = (event) => {
      emit('input', {
        text: event.text,
        id: event.id
      })
      localValue.value = ''
    }

    return {
      localValue,
      onSelect,
    }
  },
  props: [
    'value',
  ],
  components: {
    Select2,
    GlobalEvents,
  },
  data () {
    return {
      selectItems: FILTERED_ITEMS,
      selectSettings: {
        width: '100%',
        tags: true,
        placeholder: {
          id: '-1', // the value of the option
          text: 'Select an item'
        },
        minimumInputLength: 4,
        templateResult: formatState,
        matcher: function (params, data) {
            if (!params.term) {
              return data
            }
            if (params.term.trim() === '') {
                return data;
            }
            const keywords= (params.term).split(" ");
            for (var i = 0; i < keywords.length; i++) {
                if (((data.text).toUpperCase()).indexOf((keywords[i]).toUpperCase()) == -1)
                return null;
            }
            return data;
        }
      },
    }
  },
  methods: {
    onKeyUp (event) {
      if (event.key !== '/') {
        return
      }
      this.$refs.select2.select2.select2('open')
    }
  }
}
</script>

<style>

</style>
