<template>
<div class="relative flex items-center overflow-hidden text-xs bg-black bg-opacity-40">
  <div class="w-full py-2 pl-1 pr-5 truncate"
    :title="item.text">
    {{ item.text }}
  </div>
  <div class="absolute top-0 right-0 w-10 h-10 pl-2 ml-auto overflow-hidden"
    v-if="isNamed || isFactionBlue || isFactionGreen">
    <div v-if="isNamed">
      <div class="relative triangle named">
        <div class="absolute text-white">
          <div class="w-2.5 h-2.5 mt-1 ml-5 border-2 border-white rounded-sm"></div>
        </div>
      </div>
    </div>
    <div v-else-if="isFactionGreen">
      <div class="relative triangle faction-green">
        <div class="absolute text-white">
          <div class="w-2 h-2 mt-1.5 ml-5 origin-center transform rotate-45 border-2 border-white"></div>
        </div>
      </div>
    </div>
    <div v-else-if="isFactionBlue">
      <div class="relative triangle faction-blue">
        <div class="absolute text-white pl-0.5">
          <div class="w-2.5 h-2.5 -mt-1 ml-4 text-xl">
            +
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { useItemRanking } from "./hooks/ItemRanking";
export default {
  props: [
    'item'
  ],
  setup (props) {
    const { isNamed, isFactionGreen, isFactionBlue } = useItemRanking(props);
    return {
      isNamed,
      isFactionGreen,
      isFactionBlue,
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 32px 32px 0;
}
.triangle.named {
  border-color: transparent #047857 transparent transparent;
}
.triangle.faction-green {
  border-color: transparent #10B981 transparent transparent;
}
.triangle.faction-blue {
  border-color: transparent #60A5FA transparent transparent;
}
</style>
