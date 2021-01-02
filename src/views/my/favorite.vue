<template >
    <songlist :tracks="favoriteList"></songlist>
</template>

<style scoped>
</style>
<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import Songlist from "@/component/songlist.vue";
import {useStore} from "vuex";
export default defineComponent({
   name: 'favorite',
  components: {Songlist},
  setup(){
     const store =useStore();
    const favoriteList = computed(()=>store.getters.getFavoriteList);
    return{
      favoriteList,
    }
  }
});
</script>
