<template>
     <songlist :tracks="recentList"></songlist>
</template>

<style scoped lang="less">
</style>
<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue';
import Songlist from "@/component/songlist.vue";
import {useStore} from "vuex";

export default defineComponent({
  name: 'recent',
  components: {Songlist},
  setup() {
    const state = useStore();
    const recentList =computed(()=>state.getters.getRecentPlayList)
    return {
      recentList,
    }
  }
});
</script>
